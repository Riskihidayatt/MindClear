import React from "react";

const AnalysisResult = ({
  analysis,
  isBurning,
  onBurnThought,
  onTryAgain,
  onToggleMusic,
  isMusicPlaying,
}) => {
  if (!analysis) return null;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: window.innerWidth < 600 ? "1rem" : "1.5rem",
        padding: window.innerWidth < 600 ? "1.5rem" : "clamp(2rem, 5vw, 3rem)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: "all 0.5s ease",
        opacity: isBurning ? 0.8 : 1,
        transform: isBurning ? "scale(0.95)" : "scale(1)",
        margin: window.innerWidth < 600 ? "0.5rem" : "0",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
          fontWeight: "700",
          color: "white",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Insight untuk kamu ✨
      </h3>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: window.innerWidth < 600 ? "0.75rem" : "1rem",
          padding: window.innerWidth < 600 ? "1rem" : "1.5rem",
          marginBottom: window.innerWidth < 600 ? "1rem" : "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.125rem, 3vw, 1.25rem)",
            color: "white",
            lineHeight: "1.6",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          "{analysis.insight}"
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onBurnThought}
            disabled={isBurning}
            style={{
              position: "relative",
              padding: window.innerWidth < 600 ? "1rem 1.5rem" : "1.25rem 2.5rem",
              fontSize: window.innerWidth < 600 ? "1rem" : "1.25rem",
              fontWeight: "600",
              borderRadius: window.innerWidth < 600 ? "1rem" : "1.25rem",
              border: "none",
              background: isBurning
                ? "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)"
                : "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ea580c 100%)",
              color: "white",
              cursor: isBurning ? "not-allowed" : "pointer",
              opacity: isBurning ? 0.7 : 1,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: isBurning
                ? "0 8px 25px rgba(239, 68, 68, 0.2)"
                : "0 12px 35px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              transform: isBurning
                ? "scale(0.95)"
                : "translateY(-2px) scale(1.02)",
              minWidth: window.innerWidth < 600 ? "180px" : "220px",
              width: window.innerWidth < 600 ? "100%" : "auto",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              if (!isBurning) {
                e.target.style.transform = "translateY(-4px) scale(1.05)";
                e.target.style.boxShadow =
                  "0 18px 50px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isBurning) {
                e.target.style.transform = "translateY(-2px) scale(1.02)";
                e.target.style.boxShadow =
                  "0 12px 35px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)";
              }
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
              <span>{isBurning ? "Membakar..." : "Bakar Pikiran Ini"}</span>
              <span style={{ fontSize: "1.5rem" }}>🔥</span>
            </span>
            {!isBurning && (
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
                  animation: "shimmer 2s infinite",
                  zIndex: 1,
                }}
              />
            )}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 640 ? "column" : "row",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onTryAgain}
            style={{
              position: "relative",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "500",
              borderRadius: "1rem",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              minWidth: "160px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
            }}
          >
            Coba Lagi Besok
          </button>

          <button
            onClick={onToggleMusic}
            style={{
              position: "relative",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "500",
              borderRadius: "1rem",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              minWidth: "160px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
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
              <span>{isMusicPlaying ? "🔇" : "🎵"}</span>
              <span>Music</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
