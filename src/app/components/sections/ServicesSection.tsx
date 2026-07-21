import { SERVICES } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#F4F9F9]/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="playfair font-bold text-[#1A2B2B] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Our Services
          </h2>
          <p className="text-[#1A2B2B]/55 text-[15px] max-w-lg mx-auto">
            From bespoke bridal creations to everyday ethnic elegance — a complete range of boutique fashion services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-[0_12px_40px_rgba(2,112,113,0.12)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-transparent hover:border-[#027071]/20"
            >
              <div className="text-4xl mb-5">{svc.emoji}</div>
              {svc.badge && (
                <span className="inline-block bg-[#027071]/10 text-[#027071] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                  {svc.badge}
                </span>
              )}
              <h3 className="playfair text-xl font-bold text-[#1A2B2B] mb-3 group-hover:text-[#027071] transition-colors">
                {svc.title}
              </h3>
              <p className="text-[#1A2B2B]/58 text-[13px] leading-relaxed">{svc.desc}</p>
              <div className="mt-5 flex items-center gap-1.5 text-[#C8A96A] text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Enquire Now</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
