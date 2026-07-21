import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/app/components/shared/BrandMark";
import { NAV_ITEMS } from "@/app/content/site";

type NavBarProps = {
  onNavigate: (id: string) => void;
};

export function NavBar({ onNavigate }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-lg shadow-[0_2px_32px_rgba(2,112,113,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={() => handleNavigate("home")} className="flex-shrink-0">
          <BrandMark size="md" />
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className={`text-[13px] font-medium transition-colors hover:text-[#027071] ${
                scrolled ? "text-[#1A2B2B]" : "text-white/90"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className={`text-[13px] font-medium flex items-center gap-1.5 transition-colors hover:text-[#C8A96A] ${
              scrolled ? "text-[#027071]" : "text-white/90"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            +91 98765 43210
          </a>
          <button
            onClick={() => handleNavigate("contact")}
            className="gold-gradient text-[#1A2B2B] text-[13px] font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:shadow-lg transition-all hover:-translate-y-px"
          >
            Book Consultation
          </button>
        </div>

        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#1A2B2B]" : "text-white"}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8F4F4] shadow-xl">
          <div className="px-6 py-5 flex flex-col gap-4">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavigate(id)}
                className="text-left text-sm font-medium text-[#1A2B2B] hover:text-[#027071] transition-colors py-1 border-b border-[#E8F4F4] last:border-0"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("contact")}
              className="gold-gradient text-[#1A2B2B] text-sm font-semibold px-6 py-3.5 rounded-full mt-2 text-center"
            >
              Book Consultation
            </button>
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 text-[#027071] text-sm font-medium py-2"
            >
              <Phone className="w-4 h-4" /> +91 98765 43210
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
