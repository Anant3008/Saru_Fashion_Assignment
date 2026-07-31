import { useHeroReveal } from "@/app/hooks/useScrollReveal";
import { useTheme } from "@/app/context/ThemeContext";
import heroImage from "../../../../assets/Hero.jpeg";

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useHeroReveal<HTMLElement>();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  /* ─── Per-theme image rendering ────────────────────────────────────────
   *
   * Dark Mode:
   *   - Raw dark photograph, low opacity so dark overlay punches through.
   *   - Heavy dark gradient from left so text on charcoal bg reads cleanly.
   *
   * Light Mode:
   *   - Same photograph, but CSS-corrected to look bright / daylight-exposed:
   *       brightness(1.4) → lifts shadows & midtones like a well-lit shoot
   *       contrast(0.9)   → prevents harsh edges that look wrong on ivory bg
   *       saturate(0.8)   → desaturates slightly → cleaner, editorial look
   *   - Higher opacity (0.72) so the image IS the focal point, not a hint.
   *   - Only a thin warm-ivory veil overlay (max 60% on left edge) so text
   *     has a reading surface without washing the image.
   * ───────────────────────────────────────────────────────────────────── */
  const imgStyle: React.CSSProperties = isDark
    ? {
        opacity: 0.38,
        filter: "contrast(1.05) saturate(1.0)",
        objectPosition: "top center",
      }
    : {
        opacity: 0.72,
        filter: "brightness(1.4) contrast(0.9) saturate(0.8)",
        objectPosition: "top center",
      };

  const overlayStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(105deg, rgba(20,20,20,0.96) 0%, rgba(26,26,26,0.78) 50%, rgba(20,20,20,0.22) 100%)",
      }
    : {
        /* Light veil: strong enough only where text lives (left/bottom),
           almost invisible on the right so the image breathes freely. */
        background:
          "linear-gradient(105deg, rgba(248,245,240,0.88) 0%, rgba(241,236,227,0.62) 45%, rgba(235,227,215,0.18) 75%, transparent 100%)",
      };

  /* Text shadow only in Light Mode — anchors text on the bright background */
  const headingShadow: React.CSSProperties = isDark
    ? {}
    : { textShadow: "0 1px 12px rgba(248,245,240,0.85), 0 2px 4px rgba(248,245,240,0.6)" };

  const bodyShadow: React.CSSProperties = isDark
    ? {}
    : { textShadow: "0 1px 6px rgba(248,245,240,0.9)" };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-center overflow-hidden w-full"
      style={{
        minHeight: "100svh",
        backgroundColor: isDark ? "#1A1A1A" : "#F8F5F0",
      }}
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0" style={{ backgroundColor: isDark ? "#1A1A1A" : "#F8F5F0" }}>
        {/* Hero photograph */}
        <img
          src={heroImage}
          alt="Handcrafted tailoring at Saru's Fashion Studio, Hyderabad"
          className="w-full h-full object-cover transition-all duration-500"
          style={imgStyle}
          loading="eager"
        />

        {/* Theme-aware overlay — the ONLY overlay on the image */}
        <div className="absolute inset-0 transition-all duration-500" style={overlayStyle} />

        {/* Ambient glow orbs (accent colour, very subtle) */}
        <div
          className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500"
          style={{ background: isDark ? "rgba(226,180,154,0.10)" : "rgba(184,123,94,0.12)" }}
        />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-500"
          style={{ background: isDark ? "rgba(200,141,117,0.08)" : "rgba(184,123,94,0.08)" }}
        />

        {/* Subtle texture pattern */}
        <div className="absolute inset-0 hero-pattern opacity-40" />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-[640px]">
          {/* Location pill */}
          <div data-hero-supporting className="flex items-center gap-3 mb-5 sm:mb-7">
            <div
              className="h-px w-8 sm:w-12 transition-colors duration-300"
              style={{ backgroundColor: "var(--ring)" }}
            />
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.28em] uppercase font-bold transition-colors duration-300"
              style={{ color: "var(--ring)" }}
            >
              Kondapur, Hyderabad
            </span>
          </div>

          {/* Primary Heading */}
          <h1
            data-hero-heading
            className="playfair font-bold leading-[1.15] mb-5 sm:mb-6 transition-all duration-300"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
              color: "var(--primary-heading)",
              ...headingShadow,
            }}
          >
            Every Celebration Deserves an Outfit{" "}
            <span
              className="italic transition-colors duration-300"
              style={{ color: "var(--ring)" }}
            >
              as Unique
            </span>{" "}
            as You
          </h1>

          {/* Body paragraph */}
          <p
            data-hero-supporting
            className="text-sm sm:text-[15px] md:text-base leading-relaxed mb-8 sm:mb-10 max-w-[500px] transition-all duration-300"
            style={{ color: "var(--body-text)", ...bodyShadow }}
          >
            At Saru's Fashion Studio, every outfit is thoughtfully tailored to reflect your
            individuality—combining fine craftsmanship, elegant design, and meticulous attention to
            detail for every special occasion.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              data-hero-action
              onClick={() => onNavigate("contact")}
              className="font-semibold text-sm px-8 sm:px-9 py-3.5 sm:py-4 min-h-[48px] rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: "var(--ring)",
                color: "#1A1A1A",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--accent-supporting)";
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--ring)";
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
              }}
            >
              Book Appointment →
            </button>
            <button
              data-hero-action
              onClick={() => onNavigate("gallery")}
              className="font-semibold text-sm px-8 sm:px-9 py-3.5 sm:py-4 min-h-[48px] rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center"
              style={{
                border: "1px solid rgba(var(--ring-rgb, 226 180 154) / 0.4)",
                borderColor: isDark ? "rgba(226,180,154,0.35)" : "rgba(184,123,94,0.45)",
                color: "var(--primary-heading)",
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(248,245,240,0.75)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              Explore Creations
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 float-anim pointer-events-none">
        <span
          className="text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300"
          style={{ color: isDark ? "rgba(226,180,154,0.55)" : "rgba(150,91,62,0.6)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8 sm:h-10 transition-all duration-300"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(226,180,154,0.55), transparent)"
              : "linear-gradient(to bottom, rgba(150,91,62,0.55), transparent)",
          }}
        />
      </div>
    </section>
  );
}
