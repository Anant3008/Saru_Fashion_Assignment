import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 w-11 h-11 rounded-full bg-[#E2B49A] text-[#1A1A1A] flex items-center justify-center shadow-[0_6px_20px_rgba(226,180,154,0.35)] hover:bg-[#C88D75] hover:text-[#FFFFFF] hover:scale-110 active:scale-100 transition-all duration-200"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
