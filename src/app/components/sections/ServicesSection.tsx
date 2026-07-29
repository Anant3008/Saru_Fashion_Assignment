import { SERVICES } from "@/app/content/site";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[linear-gradient(180deg,#F3FAF8_0%,#FAFDFB_48%,#F4F9F9_100%)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>Custom Stitching for All</SectionLabel>
          <h2 className="playfair font-bold text-[#1A2B2B] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Four Signature Services
          </h2>
          <p className="text-[#1A2B2B]/58 text-[15px] max-w-2xl mx-auto">
            A tighter, more curated service range focused on fabrics, sarees, bridal blouses, and detailed embroidery work.
          </p>
        </div>

        <div className="mb-8 rounded-[2rem] border border-[#027071]/10 bg-white/80 backdrop-blur-sm px-6 py-5 shadow-[0_14px_45px_rgba(2,112,113,0.08)]">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#027071]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#027071]">
                Note Point
              </span>
              <p className="mt-2 text-sm text-[#1A2B2B]/70">
                Every service is built around custom stitching, careful finishing, and fabric choices that suit the occasion.
              </p>
            </div>
            <div className="text-sm font-semibold text-[#C8A96A] md:text-right">
              Made to fit, made to flatter, made for the moment.
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((svc, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-[2rem] border border-[#027071]/10 bg-white shadow-[0_12px_40px_rgba(2,112,113,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_60px_rgba(2,112,113,0.16)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={svc.image.src}
                  alt={svc.image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012f30]/72 via-[#012f30]/14 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                      <svc.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#027071] shadow-sm">
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="playfair mt-4 text-xl font-bold text-white">
                    {svc.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-[#1A2B2B]/64">
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
