import { unsplash } from "@/app/content/site";

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="relative flex items-center overflow-hidden" style={{ minHeight: "100svh" }}>
      <div className="absolute inset-0 bg-[#111]">
        <img
          src={unsplash("photo-1617627143750-d86bc21e42bb", 1920, 1200)}
          alt="Saru's Fashion Studio — Bridal and Designer Ethnic Wear Hyderabad"
          className="w-full h-full object-cover object-top opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(15,25,25,0.88) 0%, rgba(15,25,25,0.55) 55%, rgba(0,0,0,0.18) 100%)",
          }}
        />
        <div className="absolute inset-0 hero-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-28 pb-20">
        <div className="max-w-[640px]">
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-12 bg-[#C8A96A]" />
            <span className="text-[#C8A96A] text-[11px] tracking-[0.28em] uppercase font-semibold">
              Moti Nagar & Kondapur, Hyderabad
            </span>
          </div>

          <h1 className="playfair font-bold text-white leading-[1.15] mb-6" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}>
            Where Tradition Meets <span className="italic text-[#C8A96A]">Contemporary</span> Elegance
          </h1>

          <p className="text-white/80 text-[15px] md:text-base leading-relaxed mb-10 max-w-[500px]">
            Custom-tailored ethnic wear, bridal blouses, designer stitching, and boutique fashion — crafted uniquely for you, right here in Hyderabad.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("contact")}
              className="gold-gradient text-[#1A2B2B] font-semibold text-sm px-9 py-4 rounded-full hover:opacity-90 hover:shadow-2xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Appointment →
            </button>
            <button
              onClick={() => onNavigate("gallery")}
              className="border border-white/50 text-white font-semibold text-sm px-9 py-4 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              View Collection
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 float-anim">
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
