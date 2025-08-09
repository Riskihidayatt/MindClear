import React from "react";

const ComfortMessage = ({ message, onTryAgain }) => {
  if (!message) return null;

  return (
    <div style={{ animation: "float 3s ease-in-out infinite" }}>
      <div
        style={{
          maxWidth: "32rem",
          margin: "0 auto",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "1.5rem",
          padding: "clamp(2rem, 5vw, 3rem)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>💙</div>

        <h3
          style={{
            fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
            fontWeight: "700",
            color: "white",
            marginBottom: "1.5rem",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Untuk kamu... ✨
        </h3>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.125rem, 3vw, 1.25rem)",
              color: "white",
              lineHeight: "1.6",
              fontStyle: "italic",
            }}
          >
            {message}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            onClick={onTryAgain}
            style={{
              position: "relative",
              padding: "1.25rem 2.5rem",
              fontSize: "1.25rem",
              fontWeight: "600",
              borderRadius: "1.25rem",
              border: "none",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow:
                "0 12px 35px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px) scale(1.02)",
              minWidth: "220px",
              margin: "0 auto",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px) scale(1.05)";
              e.target.style.boxShadow =
                "0 18px 50px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
              e.target.style.boxShadow =
                "0 12px 35px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)";
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                position: "relative",
                zIndex: 2,
              }}
            >
              <span>Coba Lagi Besok</span>
              <span style={{ fontSize: "1.5rem" }}>✨</span>
            </span>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shimmer 3s infinite",
                zIndex: 1,
              }}
            />
          </button>

          <p
            style={{
              fontSize: "0.875rem",
              color: "white",
              opacity: 0.7,
              fontStyle: "italic",
              marginTop: "1rem",
            }}
          >
            Kamu sudah berani hari ini. That's enough. 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComfortMessage;
