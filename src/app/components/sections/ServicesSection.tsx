import { SERVICES } from "@/app/content/site";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useScrollCards } from "@/app/hooks/useScrollReveal";

export function ServicesSection() {
  const sectionRef = useScrollCards<HTMLElement>({ scale: 0.96 });

  return (
    <section ref={sectionRef} id="services" className="relative py-20 sm:py-28 bg-[var(--background)] overflow-hidden w-full">
      {/* Glow ambient background element */}
      <div className="absolute top-1/2 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <SectionLabel data-reveal>OUR SERVICES</SectionLabel>
          <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            Crafted for <span className="italic text-[var(--ring)]">Every Occasion</span>
          </h2>
          <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] max-w-2xl mx-auto">
            From bridal ensembles to festive and occasion wear, every design is carefully tailored to combine elegance, comfort, and timeless craftsmanship.
          </p>
        </div>

        {/* Highlight Box */}
        <div data-reveal className="mb-8 sm:mb-10 rounded-[1.5rem] sm:rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5 sm:px-6 sm:py-5 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-[var(--ring)]/15 border border-[var(--ring)]/30 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ring)]">
                Why Choose Us
              </span>
              <p className="mt-2 text-xs sm:text-sm text-[var(--body-text)] leading-relaxed">
                Every outfit is designed with premium finishing, thoughtful detailing, and personalized attention to ensure it feels uniquely yours.
              </p>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--ring)] md:text-right shrink-0">
              Designed with Care. Tailored for You.
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((svc, i) => (
            <article
              data-reveal
              key={i}
              className="group overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--card-hover-border)] hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={svc.image.src}
                  alt={svc.image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/30 to-transparent opacity-85" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 sm:h-11 w-10 sm:w-11 items-center justify-center rounded-xl bg-[var(--card-bg)]/80 text-[var(--ring)] border border-[var(--ring)]/30 backdrop-blur-sm group-hover:bg-[var(--ring)] group-hover:text-[#1A1A1A] transition-colors duration-300">
                      <svc.icon className="h-4 sm:h-5 w-4 sm:w-5" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full bg-[var(--card-bg)]/90 border border-[var(--ring)]/40 px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ring)] shadow-sm">
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="playfair mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[var(--primary-heading)] group-hover:text-[var(--ring)] transition-colors">
                    {svc.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--body-text)]">
                  {svc.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
