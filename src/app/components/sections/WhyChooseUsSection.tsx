import { WHY_US } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";

export function WhyChooseUsSection() {
  const sectionRef = useStaggerReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-[var(--alt-bg)] overflow-hidden w-full">
      {/* Background glow gradient */}
      <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <SectionLabel data-reveal>WHY CHOOSE US</SectionLabel>
          <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            The Saru's <span className="italic text-[var(--ring)]">Difference</span>
          </h2>
          <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] max-w-lg mx-auto">
            Everything we do is guided by a single commitment — making you feel extraordinary in every outfit we create.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 md:gap-10">
          {WHY_US.map((item, i) => (
            <div
              data-reveal
              key={i}
              className="flex gap-4 sm:gap-5 items-start group p-5 sm:p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--ring)]/15 border border-[var(--ring)]/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[var(--ring)] transition-all duration-300 shadow-md">
                <item.icon className="h-5 sm:h-6 w-5 sm:w-6 text-[var(--ring)] transition-colors duration-300 group-hover:text-[#1A1A1A]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--primary-heading)] text-base sm:text-[16px] mb-1.5 sm:mb-2 group-hover:text-[var(--ring)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[var(--body-text)] text-xs sm:text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
