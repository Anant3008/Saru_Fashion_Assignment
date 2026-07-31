import { MapPin, MessageCircle, Instagram, Phone } from "lucide-react";
import { BOOKING_CONTACTS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";

type BookingCtaSectionProps = {
  onNavigate: (id: string) => void;
};

export function BookingCtaSection({ onNavigate }: BookingCtaSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 bg-[var(--background)] border-y border-[var(--card-border)] overflow-hidden w-full">
      {/* Background glow gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 sm:h-80 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <SectionLabel data-reveal>BOOK APPOINTMENT</SectionLabel>
        <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] mb-4 sm:mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
          Ready to Design Your <span className="italic text-[var(--ring)]">Dream Outfit?</span>
        </h2>
        <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
          Book your personal consultation today and take the first step towards wearing something truly made for you.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row justify-center gap-3.5 sm:gap-4 mb-10 sm:mb-12 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={() => onNavigate("contact")}
            className="bg-[var(--ring)] text-[#1A1A1A] font-semibold text-sm px-8 sm:px-10 py-3.5 sm:py-4 min-h-[48px] rounded-full hover:bg-[var(--accent-supporting)] hover:text-[#FFFFFF] hover:shadow-[0_8px_25px_var(--ring)] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center items-center flex shadow-lg"
          >
            Book Your Appointment
          </button>
          <a
            href="https://wa.me/919989017733"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-[#FFFFFF] font-semibold text-sm px-8 py-3.5 sm:py-4 min-h-[48px] rounded-full hover:bg-[#1fba58] transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {BOOKING_CONTACTS.map((item, i) => {
            const icon =
              item.label === "WhatsApp" ? <MessageCircle className="w-5 h-5" /> :
              item.label === "Call Us" ? <Phone className="w-5 h-5" /> :
              item.label === "Instagram" ? <Instagram className="w-5 h-5" /> :
              <MapPin className="w-5 h-5" />;

            return (
              <a
                data-reveal
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-3.5 sm:p-4 hover:shadow-lg transition-all text-center hover:border-[var(--card-hover-border)] hover:-translate-y-0.5 min-h-[90px] flex flex-col justify-center items-center"
              >
                <div className="flex justify-center mb-1.5 text-[var(--ring)]">
                  {icon}
                </div>
                <div className="text-[var(--secondary-text)] text-[9px] uppercase tracking-wider mb-0.5">{item.label}</div>
                <div className="text-[var(--section-heading)] text-[11px] font-semibold truncate w-full">{item.value}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
