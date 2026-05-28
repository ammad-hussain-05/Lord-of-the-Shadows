"use client"

import { useRef, useState } from "react"

export function Loader({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<"intro" | "playing" | "leaving">("intro")

  // Phase 1 → user clicks the intro screen → unmute + play video with sound
  const handleIntroClick = async () => {
    if (phase !== "intro") return
    setPhase("playing")
    const vid = videoRef.current
    if (vid) {
      vid.muted = false
      vid.volume = 1
      try {
        await vid.play()
      } catch {
        // fallback: keep muted and play silently
        vid.muted = true
        await vid.play()
      }
    }
  }

  // Phase 2 → user clicks again → stop sound, fade out, call onComplete
  const handleEnterClick = () => {
    if (phase !== "playing") return
    setPhase("leaving")
    const vid = videoRef.current
    if (vid) {
      vid.pause()
      vid.muted = true
    }
    setTimeout(onComplete, 700)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ${
        phase === "leaving" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ── VIDEO — always in DOM, starts muted so browser allows it ── */}
      <video
        ref={videoRef}
        src="/video/lord.mp4"
        loop
        muted
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: "none" }}
      />

      {/* ── DARK OVERLAY ── */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ══════════════════════════════════════════
          PHASE: intro  →  tap anywhere to start
      ══════════════════════════════════════════ */}
      {phase === "intro" && (
        <div
          onClick={handleIntroClick}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
        >
          {/* Ring logo */}
          <LogoRing />

          {/* Divider */}
          <GoldDivider />

          {/* Tap to start */}
          <p
            className="select-none mt-0"
            style={{
              fontFamily: "'Palatino Linotype', Palatino, serif",
              fontSize: "clamp(9px, 1.3vw, 12px)",
              letterSpacing: "5px",
              color: "rgba(212,120,40,0.92)",
              textTransform: "uppercase",
              textShadow: "0 0 12px rgba(212,120,40,0.6)",
              animation: "lotrBlink 2s ease-in-out infinite",
            }}
          >
            ✦ Tap to Begin ✦
          </p>

          <p
            className="select-none mt-3"
            style={{
              fontFamily: "'Palatino Linotype', Palatino, serif",
              fontSize: "clamp(8px, 1vw, 10px)",
              letterSpacing: "3px",
              color: "rgba(212,120,40,0.4)",
              textTransform: "uppercase",
            }}
          >
            ( enables sound )
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════
          PHASE: playing  →  video + sound running
          click to enter website
      ══════════════════════════════════════════ */}
      {phase === "playing" && (
        <div
          onClick={handleEnterClick}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
        >
          {/* Ring logo */}
          <LogoRing />

          {/* Divider */}
          <GoldDivider />

          {/* Enter realm */}
          <p
            className="select-none"
            style={{
              fontFamily: "'Palatino Linotype', Palatino, serif",
              fontSize: "clamp(9px, 1.3vw, 12px)",
              letterSpacing: "5px",
              color: "rgba(212,120,40,0.92)",
              textTransform: "uppercase",
              textShadow: "0 0 12px rgba(212,120,40,0.6)",
              animation: "lotrBlink 2s ease-in-out infinite",
            }}
          >
            ✦ Click to Enter the Realm ✦
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes lotrSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes lotrBlink {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ── Reusable logo ring ── */
function LogoRing() {
  return (
    <div
      className="relative mb-5"
      style={{
        width: "clamp(260px, 58vw, 340px)",
        height: "clamp(250px, 28vw, 240px)",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        style={{
          animation: "lotrSpin 28s linear infinite",
          filter: "drop-shadow(0 0 14px rgba(212,120,40,0.75))",
        }}
      >
        <defs>
          <path
            id="ringPath"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <circle cx="100" cy="100" r="92" fill="rgba(0,0,0,0.35)" stroke="#d47828" strokeWidth="1.5" opacity="0.55" />
        <circle cx="100" cy="100" r="76" fill="none" stroke="#d47828" strokeWidth="0.6" opacity="0.3" />
        <text fontSize="10.5" fill="#d47828" opacity="0.9" fontFamily="serif" letterSpacing="1.5">
          <textPath href="#ringPath">
            ᚐᚋᚐᚌᚑᚅ · ᚋᚓᚂᚉᚑᚏ · ᚌᚑᚅᚇᚑᚏ · ᚐᚁᚐᚏᚈᚆ · ᚋᚑᚏᚇᚑᚏ · ᚅᚒᚋᚓᚅᚑᚏ ·
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        <span style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", fontSize: "clamp(9px, 1.4vw, 13px)", letterSpacing: "6px", color: "#d47828", textTransform: "uppercase", lineHeight: 1, marginBottom: "2px" }}>
          The
        </span>
        <span style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", fontSize: "clamp(14px, 2.5vw, 30px)", fontWeight: 700, color: "#d47828", textTransform: "uppercase", letterSpacing: "2px", lineHeight: 1, textShadow: "0 0 22px rgba(212,120,40,0.95), 0 0 44px rgba(212,120,40,0.45)" }}>
          Lord
        </span>
        <span style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", fontSize: "clamp(9px, 1.4vw, 13px)", letterSpacing: "5px", color: "#d47828", textTransform: "uppercase", lineHeight: 1.5 }}>
          of the
        </span>
        <span style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", fontSize: "clamp(20px, 3.8vw, 26px)", fontWeight: 700, color: "#d47828", textTransform: "uppercase", letterSpacing: "3px", lineHeight: 1, textShadow: "0 0 22px rgba(212,120,40,0.95), 0 0 44px rgba(212,120,40,0.45)" }}>
          Shadows
        </span>
      </div>
    </div>
  )
}

/* ── Gold divider ── */
function GoldDivider() {
  return (
    <div style={{
      width: "clamp(80px, 12vw, 120px)",
      height: "1px",
      background: "linear-gradient(to right, transparent, #d47828, transparent)",
      opacity: 0.65,
      marginBottom: "18px",
    }} />
  )
}