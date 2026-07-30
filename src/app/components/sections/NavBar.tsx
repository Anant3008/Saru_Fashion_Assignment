import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "../shared/BrandMark";
import { CONTACT, NAV_ITEMS } from "../../content/site";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">


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
              className={`relative group text-[14px] tracking-[0.08em] font-medium transition-all duration-300 ${
                activeSection === id
                  ? "text-secondary"
                  : scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-secondary"
              }`}
            >
              {label}

              <span
               className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-secondary transition-all duration-300 ${
                activeSection === id
                 ? "w-full"
                 : "w-0 group-hover:w-full"
               }`}
              />
            </button>

          ))}

        </div>




        {/* Desktop Contact */}
        <div className="hidden lg:flex items-center gap-4">

          <a
            href={`tel:${CONTACT.phone}`}
            className={`text-[14px] tracking-wide font-medium flex items-center gap-1.5 transition-colors hover:text-secondary ${
              scrolled
                ? "text-primary/80"
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
            className="taupe-gradient text-white text-[13px] font-semibold tracking-wide px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
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

        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 rounded-b-3xl shadow-2xl">

          <div className="px-6 py-5 flex flex-col gap-4">


            {NAV_ITEMS.map(({ label, id }) => (

              <button
                key={id}
                onClick={() =>
                  handleNavigate(id)
                }
                className={`text-left text-base tracking-wide font-medium transition-all py-3 border-b border-black/5 last:border-0 ${
                  activeSection === id
                    ? "text-secondary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {label}
              </button>

            ))}


          <hr className="border-black/5 my-2" />

            <p className="text-center text-xs text-muted-foreground">
              Looking for a custom-designed outfit?
            </p>

            <button
              onClick={() =>
                handleNavigate("contact")
              }
              className="taupe-gradient text-white text-sm font-semibold tracking-wide px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Book your Appointment
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