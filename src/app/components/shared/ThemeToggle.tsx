import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [ripple, setRipple] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const handleToggle = () => {
    // Trigger ripple + glow burst animations
    setRipple(true);
    setGlowing(true);
    setTimeout(() => setRipple(false), 500);
    setTimeout(() => setGlowing(false), 700);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className="relative w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] overflow-hidden"
      style={{
        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        border: "1px solid var(--nav-border)",
        transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease, background 300ms ease",
        transform: "scale(1)",
        boxShadow: glowing
          ? "0 0 0 4px rgba(226,180,154,0.25), 0 0 20px rgba(226,180,154,0.35)"
          : "0 0 0 0px rgba(226,180,154,0)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px var(--nav-glow)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        if (!glowing) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 0px rgba(226,180,154,0)";
        }
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
      }}
    >
      {/* Ripple burst on click */}
      {ripple && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(226,180,154,0.45) 0%, transparent 70%)",
            animation: "toggleRipple 500ms ease-out forwards",
          }}
        />
      )}

      {/* Sun icon — shown in Dark Mode (click to switch to Light) */}
      <Sun
        aria-hidden="true"
        className="absolute"
        style={{
          width: "16px",
          height: "16px",
          color: "#B87B5E",
          transition: "opacity 350ms ease, transform 450ms cubic-bezier(0.34,1.56,0.64,1)",
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(90deg) scale(0.45)" : "rotate(0deg) scale(1)",
          filter: !isDark ? "drop-shadow(0 0 4px rgba(184,123,94,0.6))" : "none",
        }}
      />

      {/* Moon icon — shown in Light Mode (click to switch to Dark) */}
      <Moon
        aria-hidden="true"
        className="absolute"
        style={{
          width: "16px",
          height: "16px",
          color: "#E2B49A",
          transition: "opacity 350ms ease, transform 450ms cubic-bezier(0.34,1.56,0.64,1)",
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.45)",
          filter: isDark ? "drop-shadow(0 0 4px rgba(226,180,154,0.6))" : "none",
        }}
      />

      {/* Keyframe injection */}
      <style>{`
        @keyframes toggleRipple {
          0%   { transform: scale(0.4); opacity: 1; }
          60%  { transform: scale(1.4); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
