import React, { useState } from "react";
import soundEffects from "../utils/soundEffects";

const TextArea = ({
  value,
  onChange,
  placeholder = "spill your thoughts here... 💭",
  maxLength = 2000,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const oldLength = value.length;
    const newLength = newValue.length;

    // Play typing sound only when adding characters (not deleting)
    if (newLength > oldLength) {
      soundEffects.playTypeThrottled();
    }

    onChange(e);
  };

  const getCharacterCountColor = () => {
    const percentage = (value.length / maxLength) * 100;
    if (percentage > 90) return "#f87171";
    if (percentage > 75) return "#fbbf24";
    if (percentage > 50) return "#60a5fa";
    return "rgba(255, 255, 255, 0.6)";
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Modern floating label effect */}
      <div style={{ position: "relative" }}>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder=""
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            height: window.innerWidth < 600 ? "10rem" : "12rem",
            padding: window.innerWidth < 600 ? "1rem" : "1.5rem",
            borderRadius: window.innerWidth < 600 ? "1rem" : "1.5rem",
            background: isFocused
              ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(102,126,234,0.05) 100%)"
              : "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            border: isFocused
              ? "2px solid rgba(96, 165, 250, 0.5)"
              : "2px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            fontSize: window.innerWidth < 600 ? "0.9rem" : "clamp(1rem, 2.5vw, 1.125rem)",
            lineHeight: "1.6",
            resize: "none",
            outline: "none",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isFocused
              ? "0 10px 25px -5px rgba(96, 165, 250, 0.2)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            boxSizing: "border-box",
          }}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />

        {/* Modern floating placeholder */}
        <div
          style={{
            position: "absolute",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
            top: value || isFocused ? (window.innerWidth < 600 ? "0.75rem" : "1rem") : (window.innerWidth < 600 ? "1rem" : "1.5rem"),
            left: window.innerWidth < 600 ? "1rem" : "1.5rem",
            fontSize: value || isFocused ? (window.innerWidth < 600 ? "0.75rem" : "0.875rem") : (window.innerWidth < 600 ? "0.9rem" : "1rem"),
            color:
              value || isFocused
                ? "rgba(147, 197, 253, 0.8)"
                : "rgba(255, 255, 255, 0.5)",
            transform: value || isFocused ? "scale(0.9)" : "scale(1)",
            transformOrigin: "left top",
          }}
        >
          {placeholder}
        </div>

        {/* Neon glow effect when focused */}
        {isFocused && (
          <div
            style={{
              position: "absolute",
              inset: "0",
              borderRadius: "1.5rem",
              background:
                "linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
              filter: "blur(12px)",
              zIndex: "-10",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </div>

      {/* Modern character counter with progress bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {value.length > 0 && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#10b981",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#10b981",
                  fontWeight: "500",
                }}
              >
                typing...
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Mini progress bar */}
          <div
            style={{
              width: "4rem",
              height: "0.25rem",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                transition: "all 0.3s ease",
                width: `${(value.length / maxLength) * 100}%`,
                background:
                  value.length > maxLength * 0.9
                    ? "#f87171"
                    : value.length > maxLength * 0.75
                    ? "#fbbf24"
                    : "#60a5fa",
              }}
            />
          </div>

          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "color 0.3s ease",
              color: getCharacterCountColor(),
            }}
          >
            {value.length}/{maxLength}
          </span>
        </div>
      </div>

      {/* Helpful hints */}
      {!value && !isFocused && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(255, 255, 255, 0.4)",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          ✨ Tip: Just write whatever's on your mind, no judgment here
        </div>
      )}
    </div>
  );
};

export default TextArea;
