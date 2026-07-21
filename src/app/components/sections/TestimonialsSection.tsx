import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96A] text-[#C8A96A]" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 teal-gradient-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Client Stories</SectionLabel>
          <h2 className="playfair font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Loved by Hyderabad's Women
          </h2>
          <p className="text-white/55 text-[15px] max-w-lg mx-auto">
            Real words from the women we've had the privilege of dressing for their most special moments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white/[0.09] backdrop-blur-sm border border-white/15 rounded-3xl p-7 hover:bg-white/[0.14] transition-all duration-200">
              <div className="playfair text-5xl text-[#C8A96A] leading-none mb-1">"</div>
              <p className="text-white/82 text-[13px] leading-[1.8] mt-3 mb-5">{t.text}</p>
              <Stars n={t.rating} />
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#1A2B2B] text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/45 text-[11px]">{t.location}, Hyd</div>
                </div>
                <span className="bg-[#C8A96A]/20 text-[#C8A96A] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
