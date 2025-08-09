import React, { useEffect, useState } from "react";
import soundEffects from "../utils/soundEffects";

const BurnAnimation = ({ isActive, onComplete, children }) => {
  const [animationStage, setAnimationStage] = useState("idle"); // idle, burning, burned

  useEffect(() => {
    if (isActive) {
      setAnimationStage("burning");
      
      // Play burn sound effect
      soundEffects.playBurn();

      const timer = setTimeout(() => {
        setAnimationStage("burned");
        onComplete && onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setAnimationStage("idle");
    }
  }, [isActive, onComplete]);

  const getAnimationStyles = () => {
    switch (animationStage) {
      case "burning":
        return {
          filter: 'brightness(1.2) contrast(1.1) sepia(0.2) hue-rotate(15deg)',
          transform: 'scale(1.02)',
          transition: 'all 0.5s ease'
        };
      case "burned":
        return {
          opacity: 0,
          transform: 'scale(0.75)',
          transition: 'all 0.5s ease'
        };
      default:
        return {
          transition: 'all 0.5s ease'
        };
    }
  };

  return (
    <div style={getAnimationStyles()}>
      {children}

      {animationStage === "burning" && (
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50
        }}>
          {/* Flame particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '0.5rem',
                  height: '0.5rem',
                  background: 'linear-gradient(to top, #ef4444, #fbbf24)',
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${1 + Math.random()}s infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Burn overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(127, 29, 29, 0.2), rgba(194, 65, 12, 0.1), transparent)',
            animation: 'pulse 1.5s infinite'
          }} />
        </div>
      )}
    </div>
  );
};

export default BurnAnimation;
