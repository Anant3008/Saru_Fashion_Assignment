import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/app/components/shared/BrandMark";
import { ThemeToggle } from "@/app/components/shared/ThemeToggle";
import { CONTACT, NAV_ITEMS } from "@/app/content/site";
import { useTheme } from "@/app/context/ThemeContext";

type NavBarProps = {
  onNavigate: (id: string) => void;
};

export function NavBar({ onNavigate }: NavBarProps) {
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // for animation
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Active indicator (sliding pill)
  const navLinksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Magnetic effect state per link
  const [magnetOffset, setMagnetOffset] = useState<Record<number, { x: number; y: number }>>({});

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Progress bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Small delay so CSS transition has something to animate from
      requestAnimationFrame(() => setMenuVisible(true));
    } else {
      setMenuVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  /* ── Active section tracking ── */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Active indicator position ── */
  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(({ id }) => id === activeSection);
    const el = navLinksRef.current[idx];
    const container = navContainerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  /* ── Magnetic hover handler ── */
  const handleMagnet = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
      setMagnetOffset((prev) => ({ ...prev, [idx]: { x, y } }));
    },
    []
  );

  const resetMagnet = useCallback((idx: number) => {
    setMagnetOffset((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    onNavigate(id);
    setMenuOpen(false);
  };

  /* ── CSS values based on state ── */
  const glassBase = isDark
    ? "rgba(20, 20, 20, var(--glass-opacity, 0.5))"
    : "rgba(255, 252, 248, var(--glass-opacity, 0.65))";

  const navPillStyle: React.CSSProperties = scrolled
    ? {
        "--glass-opacity": isDark ? "0.82" : "0.90",
        backdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        background: isDark
          ? "rgba(18,18,18,0.82)"
          : "rgba(255,252,248,0.90)",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px var(--nav-glow)"
          : "0 20px 60px rgba(184,123,94,0.12), 0 4px 16px rgba(184,123,94,0.08), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 40px var(--nav-glow)",
      } as React.CSSProperties
    : {
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        background: isDark
          ? "rgba(26,26,26,0.42)"
          : "rgba(255,252,248,0.62)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.25), 0 1px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 8px 32px rgba(184,123,94,0.08), 0 1px 8px rgba(184,123,94,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
      } as React.CSSProperties;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[padding] duration-500 ease-out ${scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5">
        {/* ── Glass pill ── */}
        <div
          className="relative rounded-2xl border flex items-center justify-between px-3 sm:px-5 transition-all duration-500 ease-out overflow-hidden"
          style={{
            ...navPillStyle,
            borderColor: isDark ? "rgba(226,180,154,0.18)" : "rgba(184,123,94,0.20)",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          {/* Inner glass highlight — top shimmer line */}
          <div
            className="absolute top-0 left-4 right-4 h-px pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.08) 60%, transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent)",
            }}
          />

          {/* Scroll progress bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{ background: isDark ? "rgba(226,180,154,0.08)" : "rgba(184,123,94,0.06)" }}
          >
            <div
              className="h-full origin-left"
              style={{
                width: "100%",
                transform: `scaleX(${scrollProgress / 100})`,
                transition: "transform 80ms linear",
                background: `linear-gradient(90deg, var(--ring), var(--accent-supporting))`,
                boxShadow: "0 0 6px var(--ring)",
              }}
            />
          </div>

          {/* Brand Logo */}
          <button
            onClick={() => handleNavigate("home")}
            aria-label="Saru's Fashion Studio — Go to home"
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:rounded-lg min-h-[44px] flex items-center group"
            style={{ willChange: "transform" }}
          >
            <div className="transition-all duration-350 ease-out group-hover:scale-105 group-active:scale-95"
              style={{
                filter: "drop-shadow(0 0 0px var(--ring))",
                transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), filter 350ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter = "drop-shadow(0 0 8px var(--ring))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter = "drop-shadow(0 0 0px var(--ring))";
              }}
            >
              <BrandMark size="md" />
            </div>
          </button>

          {/* Desktop nav links with sliding active indicator */}
          <div
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
          >
            {/* Sliding active background pill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                background: isDark
                  ? "rgba(226,180,154,0.12)"
                  : "rgba(184,123,94,0.10)",
                border: "1px solid rgba(226,180,154,0.20)",
                boxShadow: isDark
                  ? "0 0 12px rgba(226,180,154,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 0 12px rgba(184,123,94,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
                transition: "left 350ms cubic-bezier(0.34,1.2,0.64,1), width 350ms cubic-bezier(0.34,1.2,0.64,1), opacity 250ms ease",
                willChange: "left, width",
              }}
            />

            {NAV_ITEMS.map(({ label, id }, idx) => {
              const isActive = activeSection === id;
              const isHovered = hoveredNav === idx;
              const mag = magnetOffset[idx] ?? { x: 0, y: 0 };

              return (
                <button
                  key={id}
                  ref={(el) => { navLinksRef.current[idx] = el; }}
                  onClick={() => handleNavigate(id)}
                  onMouseMove={(e) => handleMagnet(e, idx)}
                  onMouseEnter={() => setHoveredNav(idx)}
                  onMouseLeave={() => {
                    resetMagnet(idx);
                    setHoveredNav(null);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className="relative text-[13px] xl:text-[14px] font-medium min-h-[44px] inline-flex items-center px-3 xl:px-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] z-10"
                  style={{
                    color: isActive || isHovered ? "var(--ring)" : "var(--secondary-text)",
                    fontWeight: isActive ? 600 : 500,
                    transform: `translate(${mag.x}px, ${mag.y}px) scale(${isHovered && !isActive ? 1.03 : 1})`,
                    transition: "color 220ms ease, transform 200ms cubic-bezier(0.16,1,0.3,1)",
                    willChange: "transform",
                  }}
                >
                  {/* Isolated per-item hover glow background — never bleeds to other items */}
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: isDark
                        ? "radial-gradient(ellipse at center, rgba(226,180,154,0.14) 0%, transparent 75%)"
                        : "radial-gradient(ellipse at center, rgba(184,123,94,0.12) 0%, transparent 75%)",
                      opacity: isHovered && !isActive ? 1 : 0,
                      transition: "opacity 220ms ease",
                    }}
                  />
                  {label}
                  {/* Bottom underline — active always visible, hovered fades in */}
                  <span
                    className="absolute bottom-1.5 left-3 right-3 h-px rounded-full pointer-events-none origin-left"
                    style={{
                      background: "var(--ring)",
                      transform: isActive ? "scaleX(1)" : isHovered ? "scaleX(0.7)" : "scaleX(0)",
                      opacity: isActive ? 0.6 : isHovered ? 0.45 : 0,
                      transition: "transform 280ms cubic-bezier(0.34,1.2,0.64,1), opacity 220ms ease",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop right controls */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
            {/* Phone link */}
            <a
              href={`tel:${CONTACT.phone}`}
              aria-label={`Call us at ${CONTACT.displayPhone}`}
              className="text-[13px] font-medium flex items-center gap-1.5 min-h-[44px] px-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              style={{ color: "var(--ring)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{CONTACT.displayPhone}</span>
            </a>

            <ThemeToggle />

            {/* Book Appointment CTA */}
            <BookButton onClick={() => handleNavigate("contact")} />
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              className="p-2.5 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: "1px solid var(--nav-border)",
                color: "var(--primary-heading)",
              }}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className="block w-5 h-5 relative"
                style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)" }}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 absolute inset-0 transition-all duration-300" style={{ transform: "rotate(0deg)", opacity: 1 }} />
                ) : (
                  <Menu className="w-5 h-5 absolute inset-0 transition-all duration-300" style={{ transform: "rotate(0deg)", opacity: 1 }} />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer with slide animation ── */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="lg:hidden fixed inset-x-3 top-[72px] rounded-2xl overflow-hidden z-50"
          style={{
            bottom: "1.25rem",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            background: isDark ? "rgba(18,18,18,0.90)" : "rgba(255,252,248,0.92)",
            border: `1px solid ${isDark ? "rgba(226,180,154,0.2)" : "rgba(184,123,94,0.22)"}`,
            boxShadow: isDark
              ? "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 24px 80px rgba(184,123,94,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
            transform: menuVisible ? "translateY(0) scale(1)" : "translateY(-16px) scale(0.97)",
            opacity: menuVisible ? 1 : 0,
            transition: "transform 320ms cubic-bezier(0.34,1.2,0.64,1), opacity 280ms ease",
          }}
        >
          {/* Inner top shimmer */}
          <div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />

          <div className="px-5 pt-5 pb-6 flex flex-col gap-2 h-full overflow-y-auto">
            {/* Nav items */}
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.map(({ label, id }, idx) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigate(id)}
                    aria-current={isActive ? "page" : undefined}
                    className="relative text-left text-[15px] font-medium py-3.5 px-4 rounded-xl min-h-[52px] flex items-center gap-3 transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    style={{
                      color: isActive ? "var(--ring)" : "var(--secondary-text)",
                      fontWeight: isActive ? 600 : 500,
                      background: isActive
                        ? isDark ? "rgba(226,180,154,0.10)" : "rgba(184,123,94,0.08)"
                        : "transparent",
                      animationDelay: `${idx * 40}ms`,
                    }}
                  >
                    {/* Active dot */}
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                      style={{
                        background: "var(--ring)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0)",
                        boxShadow: isActive ? "0 0 6px var(--ring)" : "none",
                      }}
                    />
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t flex flex-col gap-3" style={{ borderColor: isDark ? "rgba(226,180,154,0.1)" : "rgba(184,123,94,0.12)" }}>
              <button
                onClick={() => handleNavigate("contact")}
                className="w-full text-base font-semibold py-4 rounded-xl min-h-[52px] flex items-center justify-center transition-all duration-300 active:scale-95"
                style={{
                  background: "var(--ring)",
                  color: "#1A1A1A",
                  boxShadow: "0 6px 24px rgba(226,180,154,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-supporting)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--ring)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                }}
              >
                Book Appointment
              </button>
              <a
                href={`tel:${CONTACT.phone}`}
                aria-label={`Call ${CONTACT.displayPhone}`}
                className="flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--ring)" }}
              >
                <Phone className="w-4 h-4" />
                {CONTACT.displayPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Premium Book Appointment CTA ── */
function BookButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      aria-label="Book an appointment"
      className="relative overflow-hidden text-[13px] font-semibold px-5 xl:px-6 py-2.5 min-h-[44px] rounded-full transition-all duration-350 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:scale-95"
      style={{
        background: "var(--ring)",
        color: "#1A1A1A",
        transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 12px 32px rgba(226,180,154,0.45), 0 4px 12px rgba(226,180,154,0.25)"
          : "0 4px 16px rgba(226,180,154,0.20)",
        transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms ease, background 250ms ease",
      }}
    >
      {/* Liquid shine overlay */}
      <span
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.35) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 250ms ease",
        }}
      />
      <span className="relative z-10 whitespace-nowrap">Book Appointment</span>
    </button>
  );
}