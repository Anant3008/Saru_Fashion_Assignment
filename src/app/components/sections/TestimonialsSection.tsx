import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[var(--ring)] text-[var(--ring)]" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useStaggerReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-20 sm:py-28 bg-[var(--background)] overflow-hidden w-full">
      {/* Background glow gradient */}
      <div className="absolute top-1/2 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <SectionLabel data-reveal>CLIENT TESTIMONIALS</SectionLabel>
          <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            Trusted by <span className="italic text-[var(--ring)]">Our Clients</span>
          </h2>
          <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] max-w-lg mx-auto">
            Every smile and every review reflects the care, craftsmanship, and attention we bring to every design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              data-reveal
              key={i}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 sm:p-7 shadow-xl hover:border-[var(--card-hover-border)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quotation mark */}
                <div className="playfair text-4xl sm:text-5xl text-[var(--ring)]/50 leading-none mb-1 opacity-90">"</div>
                <p className="text-[var(--body-text)] text-xs sm:text-[14px] leading-[1.85] mt-2 mb-6 italic">{t.text}</p>
              </div>

              <div>
                <Stars n={t.rating} />
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--card-border)]">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--ring)] text-[#1A1A1A] flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm">
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[var(--primary-heading)] text-xs sm:text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-[var(--secondary-text)] text-[10px] sm:text-[11px]">{t.location}, Hyd</div>
                  </div>
                  <span className="bg-[var(--ring)]/15 text-[var(--ring)] border border-[var(--ring)]/30 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full flex-shrink-0">
                    {t.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
