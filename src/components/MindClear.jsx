import React, { useState, useEffect } from "react";
import { analyzeUserText, isGeminiConfigured } from "../utils/geminiConfig";
import { getRandomComfortMessage } from "../utils/comfortMessages";
import { useMusicPlayer } from "../utils/audioPlayer";
import soundEffects from "../utils/soundEffects";
import TextArea from "./TextArea";
import AnalysisResult from "./AnalysisResult";
import BurnAnimation from "./BurnAnimation";
import ComfortMessage from "./ComfortMessage";
import ParticleBackground from "./ParticleBackground";

// Add CSS animations
const trackSelectionAnimations = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    ${trackSelectionAnimations}
    @media (max-width: 600px) {
      .mindclear-container {
        padding: 0.5rem !important;
        max-width: 100vw !important;
        border-radius: 0.5rem !important;
        box-shadow: none !important;
      }
      .mindclear-header {
        font-size: 2rem !important;
        padding: 1.5rem 0.5rem !important;
      }
      .mindclear-btn {
        font-size: 1rem !important;
        padding: 0.75rem 1.25rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}

const MindClear = () => {
  const [currentStep, setCurrentStep] = useState("welcome"); // welcome, writing, analyzing, result, comfort
  const [userText, setUserText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [comfortMessage, setComfortMessage] = useState("");
  const [isBurning, setIsBurning] = useState(false);

  // Use audio player hook
  const {
    isPlaying: isMusicPlaying,
    toggleMusic,
    changeTrack,
  } = useMusicPlayer();

  // Helper function for dynamic backgrounds
  const getBackgroundStyle = () => {
    if (analysis && analysis.emotion) {
      // Return inline styles for specific emotions
      switch (analysis.emotion) {
        case "cemas":
          return {
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #8338ec 70%, #3a0ca3 100%)",
          };
        case "stres":
          return {
            background:
              "linear-gradient(135deg, #ff006e 0%, #ff4081 30%, #e91e63 70%, #ad1457 100%)",
          };
        case "sedih":
          return {
            background:
              "linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #667eea 70%, #764ba2 100%)",
          };
        case "marah":
          return {
            background:
              "linear-gradient(135deg, #ff006e 0%, #ff4081 30%, #ff6b6b 70%, #ee5a24 100%)",
          };
        case "bahagia":
          return {
            background:
              "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffd89b 100%)",
          };
        default:
          return {
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8338ec 100%)",
          };
      }
    }
    return {
      background:
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8338ec 100%)",
    };
  };

  // Check time for dark mode (future feature)
  useEffect(() => {
    const hour = new Date().getHours();
    const isDarkTime = hour >= 18 || hour <= 6;
    console.log("Dark mode time:", isDarkTime);
  }, []);

  const handleSubmit = async () => {
    if (!userText.trim()) return;

    soundEffects.playWhoosh();
    setCurrentStep("analyzing");

    try {
      const result = await analyzeUserText(userText);
      setAnalysis(result);
      soundEffects.playSuccess();

      // Play emotion-specific sound
      if (result.emotion) {
        setTimeout(() => {
          soundEffects.playEmotionalTone(result.emotion);
        }, 800);
      }

      setCurrentStep("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback analysis
      setAnalysis({
        emotion: "netral",
        insight:
          "Ada yang error nih, tapi that's okay! Kamu udah berani menulis dan itu yang penting. 💙",
      });
      soundEffects.playNotification();
      setCurrentStep("result");
    }
  };

  const handleBurnThought = () => {
    setIsBurning(true);
  };

  const handleBurnComplete = () => {
    const message = getRandomComfortMessage(analysis.emotion);
    setComfortMessage(message);
    setCurrentStep("comfort");
    setIsBurning(false);
  };

  const handleTryAgain = () => {
    setCurrentStep("welcome");
    setUserText("");
    setAnalysis(null);
    setComfortMessage("");
    setIsBurning(false);
  };

  // Welcome Screen
  if (currentStep === "welcome") {
    return (
      <div
        style={{
          ...getBackgroundStyle(),
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          position: "relative",
          transition: "all 1s ease",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <ParticleBackground emotion={analysis?.emotion || "default"} />
        <div
          className="mindclear-container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: "100%",
            maxWidth: "48rem",
            padding: "0 1rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              position: "relative",
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              margin: "0 auto",
            }}
          >
            {/* Modern header with animated elements */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5rem",
                  height: "5rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "1rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: "1.875rem" }}>🧠</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(3rem, 8vw, 4.5rem)",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "1rem",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "-0.025em",
                }}
              >
                MindClear<span style={{ color: "#667eea" }}>+</span>
              </h1>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "9999px",
                  padding: "0.5rem 1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    animation: "pulse 2s infinite",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                  }}
                >
                  safe space online
                </span>
              </div>

              <p
                style={{
                  fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
                  color: "white",
                  marginBottom: "2.5rem",
                  lineHeight: 1.6,
                  fontFamily: "Inter, sans-serif",
                  opacity: 0.9,
                  maxWidth: "32rem",
                  margin: "0 auto 2.5rem auto",
                  fontStyle: "italic",
                }}
              >
                "sometimes you just need a space to dump everything out — no
                judgment, no pressure. this is that place ✨"
              </p>
            </div>

            <div style={{ gap: "2rem", position: "relative", zIndex: 10 }}>
              <TextArea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="what's really going on in your head rn? 💭"
                className="h-48 md:h-56"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth < 640 ? "column" : "row",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setCurrentStep("writing");
                  }}
                  disabled={!userText.trim()}
                  style={{
                    position: "relative",
                    padding: "1rem 2.5rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    borderRadius: "1rem",
                    border: "none",
                    background: userText.trim()
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8338ec 100%)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    cursor: userText.trim() ? "pointer" : "not-allowed",
                    opacity: userText.trim() ? 1 : 0.5,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                    boxShadow: userText.trim()
                      ? "0 10px 30px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                      : "0 4px 15px rgba(0, 0, 0, 0.1)",
                    transform: userText.trim()
                      ? "translateY(-2px) scale(1.02)"
                      : "none",
                    minWidth: "160px",
                  }}
                  onMouseEnter={(e) => {
                    if (userText.trim()) {
                      e.target.style.transform = "translateY(-4px) scale(1.05)";
                      e.target.style.boxShadow =
                        "0 15px 40px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userText.trim()) {
                      e.target.style.transform = "translateY(-2px) scale(1.02)";
                      e.target.style.boxShadow =
                        "0 10px 30px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)";
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
                    <span>let's go</span>
                    <span style={{ fontSize: "1.25rem" }}>✨</span>
                  </span>
                  {userText.trim() && (
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

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {/* Main Music Toggle Button */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      toggleMusic();
                    }}
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
                      minWidth: "120px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.1)";
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
                      <span style={{ fontSize: "1.125rem" }}>
                        {isMusicPlaying ? "🔇" : "🎵"}
                      </span>
                      <span>vibes</span>
                    </span>
                  </button>

                  {/* Track Selection Panel - Only show when music is playing */}
                  {isMusicPlaying && (
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "12px",
                        padding: "0.75rem",
                        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                        minWidth: "200px",
                        animation: "fadeInUp 0.3s ease",
                        marginTop: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                          textAlign: "center",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        🎧 Choose Your Vibe
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.5rem",
                        }}
                      >
                        {[
                          {
                            key: "lofi",
                            emoji: "🌙",
                            name: "Lofi",
                            desc: "Chill",
                          },
                          {
                            key: "nature",
                            emoji: "🌿",
                            name: "Nature",
                            desc: "Fresh",
                          },
                          {
                            key: "focus",
                            emoji: "🧘",
                            name: "Focus",
                            desc: "Deep",
                          },
                          {
                            key: "rain",
                            emoji: "🌧️",
                            name: "Rain",
                            desc: "Cozy",
                          },
                        ].map((track) => (
                          <button
                            key={track.key}
                            onClick={() => {
                              changeTrack(track.key);
                              soundEffects.playClick();
                            }}
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "8px",
                              padding: "0.5rem",
                              color: "white",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.25rem",
                              textAlign: "center",
                              minHeight: "60px",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.15)";
                              e.target.style.transform = "scale(1.05)";
                              soundEffects.playHover();
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.05)";
                              e.target.style.transform = "scale(1)";
                            }}
                          >
                            <span style={{ fontSize: "1.25rem" }}>
                              {track.emoji}
                            </span>
                            <div>
                              <div style={{ fontWeight: "600" }}>
                                {track.name}
                              </div>
                              <div style={{ fontSize: "0.6rem", opacity: 0.7 }}>
                                {track.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modern tips section */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    🔒
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    100% private
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    🤖
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    AI powered
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    💙
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    judgment free
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background elements */}
            <div
              style={{
                position: "absolute",
                top: "2.5rem",
                left: "2.5rem",
                width: "5rem",
                height: "5rem",
                background: "rgba(102, 126, 234, 0.2)",
                borderRadius: "50%",
                filter: "blur(20px)",
                animation: "pulse 3s infinite",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "2.5rem",
                right: "2.5rem",
                width: "8rem",
                height: "8rem",
                background: "rgba(131, 56, 236, 0.2)",
                borderRadius: "50%",
                filter: "blur(20px)",
                animation: "pulse 3s infinite",
                animationDelay: "1s",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Writing Screen
  if (currentStep === "writing") {
    return (
      <div
        style={{
          ...getBackgroundStyle(),
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          transition: "all 1s ease",
        }}
      >
        <div
          style={{
            maxWidth: "64rem",
            margin: "0 auto",
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            position: "relative",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                borderRadius: "1rem",
                marginBottom: "1.5rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>💙</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.875rem, 5vw, 2.25rem)",
                fontWeight: "700",
                color: "white",
                marginBottom: "1rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              your safe space
            </h2>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(16, 185, 129, 0.2)",
                backdropFilter: "blur(8px)",
                borderRadius: "9999px",
                padding: "0.5rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#10b981",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              ></div>
              <span className="text-sm text-green-400 font-medium">
                completely private
              </span>
            </div>

            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              take your time, literally nobody's gonna judge you here. this is
              YOUR moment 🌟
            </p>
          </div>

          <div className="space-y-8 relative z-10">
            <TextArea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="pour your heart out... everything that's been weighing on you 💭"
              className="h-72 md:h-80"
              autoFocus
            />

            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 640 ? "column" : "row",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <button
                onClick={handleSubmit}
                disabled={!userText.trim()}
                style={{
                  position: "relative",
                  padding: "1.25rem 3rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  borderRadius: "1.25rem",
                  border: "none",
                  background: userText.trim()
                    ? "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  cursor: userText.trim() ? "pointer" : "not-allowed",
                  opacity: userText.trim() ? 1 : 0.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  boxShadow: userText.trim()
                    ? "0 12px 35px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    : "0 4px 15px rgba(0, 0, 0, 0.1)",
                  transform: userText.trim()
                    ? "translateY(-2px) scale(1.02)"
                    : "none",
                  minWidth: "180px",
                }}
                onMouseEnter={(e) => {
                  if (userText.trim()) {
                    e.target.style.transform = "translateY(-4px) scale(1.05)";
                    e.target.style.boxShadow =
                      "0 18px 50px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (userText.trim()) {
                    e.target.style.transform = "translateY(-2px) scale(1.02)";
                    e.target.style.boxShadow =
                      "0 12px 35px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)";
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
                  <span>i'm done</span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      transition: "transform 0.3s ease",
                    }}
                    className="emoji-bounce"
                  >
                    ✨
                  </span>
                </span>
                {userText.trim() && (
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

              <button
                onClick={() => setCurrentStep("welcome")}
                style={{
                  position: "relative",
                  padding: "1.25rem 2.5rem",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  borderRadius: "1.25rem",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  minWidth: "140px",
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
                  <span>←</span>
                  <span>back</span>
                </span>
              </button>
            </div>

            {/* Encouraging messages */}
            <div className="text-center">
              <p className="text-sm text-white/60">
                {userText.length < 50
                  ? "just start typing, even random thoughts count 💭"
                  : userText.length < 200
                  ? "you're doing great, keep going if you want 🌱"
                  : "wow, you're really letting it all out. that takes courage 💪"}
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>
    );
  }

  // Analyzing Screen
  if (currentStep === "analyzing") {
    return (
      <div
        style={{
          ...getBackgroundStyle(),
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          transition: "all 1s ease",
        }}
      >
        <div
          style={{
            maxWidth: "28rem",
            margin: "0 auto",
            textAlign: "center",
            borderRadius: "1.5rem",
            padding: "3rem",
            position: "relative",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div style={{ position: "relative", zIndex: 10 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                borderRadius: "1rem",
                marginBottom: "2rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                style={{ fontSize: "1.875rem", animation: "pulse 2s infinite" }}
              >
                🤖
              </span>
            </div>

            <div className="spinner" style={{ marginBottom: "2rem" }}></div>

            <h3
              style={{
                fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                fontWeight: "700",
                color: "white",
                marginBottom: "1.5rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              reading your mind...
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(168, 85, 247, 0.2)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "9999px",
                  padding: "0.5rem 1rem",
                }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-300 font-medium">
                  {!isGeminiConfigured()
                    ? "using local analysis..."
                    : "AI analyzing with empathy..."}
                </span>
              </div>

              <p className="text-white/70 text-sm">
                this might take a moment, but it's worth it ✨
              </p>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-ping"></div>
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-ping delay-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (currentStep === "result") {
    return (
      <div
        style={{
          ...getBackgroundStyle(),
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          transition: "all 1s ease",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <BurnAnimation isActive={isBurning} onComplete={handleBurnComplete}>
            <AnalysisResult
              analysis={analysis}
              isBurning={isBurning}
              onBurnThought={handleBurnThought}
              onTryAgain={handleTryAgain}
              onToggleMusic={toggleMusic}
              isMusicPlaying={isMusicPlaying}
            />
          </BurnAnimation>
        </div>
      </div>
    );
  }

  // Comfort Screen
  if (currentStep === "comfort") {
    return (
      <div
        style={{
          ...getBackgroundStyle(),
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          transition: "all 1s ease",
        }}
      >
        <ComfortMessage message={comfortMessage} onTryAgain={handleTryAgain} />
      </div>
    );
  }

  return null;
};

export default MindClear;
