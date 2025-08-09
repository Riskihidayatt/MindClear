import React, { useEffect, useRef } from "react";

const ParticleBackground = ({ emotion = "neutral" }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  const getParticleConfig = (emotion) => {
    const configs = {
      cemas: {
        count: 50,
        colors: ["#667eea", "#764ba2", "#8338ec"],
        speed: 2,
        size: { min: 1, max: 3 },
      },
      stres: {
        count: 80,
        colors: ["#ff006e", "#ff4081", "#ff6b6b"],
        speed: 3,
        size: { min: 2, max: 4 },
      },
      sedih: {
        count: 30,
        colors: ["#1e3c72", "#2a5298", "#667eea"],
        speed: 1,
        size: { min: 1, max: 2 },
      },
      bahagia: {
        count: 100,
        colors: ["#ffd89b", "#fcb69f", "#ffecd2"],
        speed: 2.5,
        size: { min: 2, max: 5 },
      },
      default: {
        count: 40,
        colors: ["#667eea", "#764ba2", "#00f5ff"],
        speed: 1.5,
        size: { min: 1, max: 3 },
      },
    };

    return configs[emotion] || configs.default;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const config = getParticleConfig(emotion);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size:
            Math.random() * (config.size.max - config.size.min) +
            config.size.min,
          color:
            config.colors[Math.floor(Math.random() * config.colors.length)],
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Pulse effect
        particle.pulse += 0.02;
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color + "20";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [emotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
