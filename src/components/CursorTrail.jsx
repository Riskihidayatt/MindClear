import React, { useEffect, useState } from "react";

const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Add new trail point
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setTrails((prev) => [...prev.slice(-10), newTrail]);
    };

    // Clean up old trails
    const cleanupTrails = () => {
      const now = Date.now();
      setTrails((prev) => prev.filter((trail) => now - trail.timestamp < 1000));
    };

    const interval = setInterval(cleanupTrails, 100);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePos.x - 10,
          top: mousePos.y - 10,
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Cursor trail */}
      {trails.map((trail) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1000);

        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-40 mix-blend-screen"
            style={{
              left: trail.x - 5,
              top: trail.y - 5,
              opacity: opacity * 0.6,
              transform: `scale(${scale})`,
              transition: "all 0.1s ease-out",
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"></div>
          </div>
        );
      })}
    </>
  );
};

export default CursorTrail;
