import { ABOUT_STATS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";
import aboutImage from "../../../../assets/Our-story.jpeg";

type AboutSectionProps = {
  onNavigate: (id: string) => void;
};

export function AboutSection({ onNavigate }: AboutSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="relative py-20 sm:py-28 bg-[var(--background)] overflow-hidden w-full">
      {/* Background glow gradient */}
      <div className="absolute top-1/3 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div data-reveal className="relative order-2 lg:order-1 max-w-lg lg:max-w-none mx-auto w-full">
          <div className="absolute -top-4 sm:-top-5 -left-4 sm:-left-5 w-full h-full border-2 border-[var(--ring)]/35 rounded-3xl pointer-events-none" />
          <img
            src={aboutImage}
            alt="Handcrafted bridal wear craftsmanship at Saru's Fashion Studio, Hyderabad"
            className="relative w-full h-[340px] sm:h-[480px] lg:h-[560px] object-cover object-top rounded-3xl shadow-2xl border border-[var(--card-border)]"
            loading="lazy"
          />
          <div className="absolute -bottom-5 sm:-bottom-7 -right-2 sm:-right-6 bg-[var(--card-bg)] rounded-2xl shadow-2xl px-5 sm:px-6 py-4 sm:py-5 border border-[var(--card-border)] backdrop-blur-md">
            <div className="playfair text-3xl sm:text-4xl font-bold text-[var(--ring)] leading-none">12+</div>
            <div className="text-[10px] sm:text-[11px] text-[var(--secondary-text)] mt-1.5 sm:mt-2 leading-tight max-w-[90px] sm:max-w-[100px]">
              Years of Crafting Excellence
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel data-reveal align="left">OUR STORY</SectionLabel>
          <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] leading-tight mb-5 sm:mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            Where Every Design<br />
            <span className="italic text-[var(--ring)]">Begins with You</span>
          </h2>
          <p data-reveal className="text-[var(--body-text)] text-sm md:text-[15px] leading-[1.85] mb-4 sm:mb-5">
            At Saru's Fashion Studio, we believe every outfit should be as unique as the person wearing it. Every design is thoughtfully tailored with precision, creativity, and attention to detail.
          </p>
          <p data-reveal className="text-[var(--body-text)] text-sm md:text-[15px] leading-[1.85] mb-8 sm:mb-10">
            From bridal wear to festive and occasion outfits, we work closely with every client to create designs that celebrate personal style while preserving the beauty of traditional craftsmanship.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {ABOUT_STATS.map((stat, i) => (
              <div data-reveal key={i} className="bg-[var(--card-bg)] rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-colors shadow-md">
                <div className="playfair text-xl sm:text-2xl font-bold text-[var(--ring)]">{stat.value}</div>
                <div className="text-[10px] sm:text-[11px] text-[var(--secondary-text)] mt-1 truncate">{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            data-reveal
            onClick={() => onNavigate("contact")}
            className="bg-[var(--ring)] text-[#1A1A1A] font-semibold text-sm px-8 sm:px-9 py-3.5 sm:py-4 min-h-[48px] rounded-full hover:bg-[var(--accent-supporting)] hover:text-[#FFFFFF] hover:shadow-[0_8px_25px_var(--ring)] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto text-center justify-center flex items-center shadow-lg"
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
