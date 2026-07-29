import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/app/components/shared/BrandMark";
import { CONTACT, NAV_ITEMS } from "@/app/content/site";

type NavBarProps = {
  onNavigate: (id: string) => void;
};

export function NavBar({ onNavigate }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


  // Lock body scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  // Active section tracking
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[id]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleSection) {
          setActiveSection(
            visibleSection.target.id
          );
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );


    sections.forEach((section) =>
      observer.observe(section)
    );


    return () => observer.disconnect();

  }, []);


  const handleNavigate = (id: string) => {
    setActiveSection(id);
    onNavigate(id);
    setMenuOpen(false);
  };


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-[0_2px_32px_rgba(15,107,109,0.10)]"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">


        <button
          onClick={() => handleNavigate("home")}
          className="flex-shrink-0"
        >
          <BrandMark size="md" />
        </button>



        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">

          {NAV_ITEMS.map(({ label, id }) => (

            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className={`text-[13px] font-medium transition-colors ${
                activeSection === id
                  ? "text-secondary"
                  : scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-secondary"
              }`}
            >
              {label}
            </button>

          ))}

        </div>




        {/* Desktop Contact */}
        <div className="hidden lg:flex items-center gap-4">

          <a
            href={`tel:${CONTACT.phone}`}
            className={`text-[13px] font-medium flex items-center gap-1.5 transition-colors hover:text-secondary ${
              scrolled
                ? "text-primary"
                : "text-white/90"
            }`}
          >

            <Phone className="w-3.5 h-3.5" />

            {CONTACT.displayPhone}

          </a>



          <button
            onClick={() =>
              handleNavigate("contact")
            }
            className="taupe-gradient text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:shadow-lg transition-all hover:-translate-y-px"
          >
            Book Appointment
          </button>


        </div>




        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? "text-foreground"
              : "text-white"
          }`}
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label="Toggle menu"
        >

          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}

        </button>


      </div>





      {/* Mobile Menu */}

      {menuOpen && (

        <div className="lg:hidden bg-background border-t border-muted shadow-xl">

          <div className="px-6 py-5 flex flex-col gap-4">


            {NAV_ITEMS.map(({ label, id }) => (

              <button
                key={id}
                onClick={() =>
                  handleNavigate(id)
                }
                className={`text-left text-sm font-medium transition-colors py-1 border-b border-muted last:border-0 ${
                  activeSection === id
                    ? "text-secondary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {label}
              </button>

            ))}



            <button
              onClick={() =>
                handleNavigate("contact")
              }
              className="taupe-gradient text-white text-sm font-semibold px-6 py-3.5 rounded-full mt-2 text-center"
            >
              Book Appointment
            </button>




            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-2"
            >

              <Phone className="w-4 h-4" />

              {CONTACT.displayPhone}

            </a>


          </div>

        </div>

      )}


    </nav>
  );
}