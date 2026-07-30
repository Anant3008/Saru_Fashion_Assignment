// Suppress missing module/type errors for image imports in TS builds
// @ts-ignore
import heroImage from "../../../../Collections/I.jpeg";
type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#111]">
        <img
          src={heroImage}
          alt="Intricate hand embroidery work at Saru's Fashion Studio, Hyderabad"
          className="w-full h-full object-cover object-top opacity-65"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.18) 100%)",
          }}
        />

        <div className="absolute inset-0 hero-pattern" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-28 pb-20">
        <div className="max-w-[640px]">

          {/* Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary text-[11px] tracking-[0.22em] uppercase font-semibold">
                Custom Boutique • Kondapur, Hyderabad
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="playfair font-bold text-white leading-[1.1] mb-8"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.3rem)" }}
          >
            Every Celebration{" "}
            <span className="italic text-secondary">
              Deserves an Outfit
            </span>{" "}
            as Unique as You
          </h1>

          {/* Description */}
          <p className="text-white/80 text-[16px] md:text-lg leading-8 mb-8 max-w-[560px]">
            At Saru's Fashion Studio, every outfit is thoughtfully tailored to
            reflect your individuality—combining fine craftsmanship, elegant
            design, and meticulous attention to detail for every special
            occasion.
          </p>

          {/* Accent Line */}
          <div className="w-20 h-[2px] bg-secondary rounded-full mb-10" />

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => onNavigate("contact")}
              className="taupe-gradient text-foreground font-semibold tracking-wide px-10 py-4 rounded-full shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
            >
              Book Your Appointment →
            </button>

            <button
              onClick={() => onNavigate("gallery")}
              className="border border-white/40 text-white font-semibold tracking-wide px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Collection
            </button>

          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">

            <div className="flex items-center gap-2">
              <span>✨</span>
              <span>Custom Tailoring</span>
            </div>

            <div className="flex items-center gap-2">
              <span>👰</span>
              <span>Bridal Specialists</span>
            </div>

            <div className="flex items-center gap-2">
              <span>🧵</span>
              <span>Handcrafted Designs</span>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 float-anim">
        <span className="text-[9px] tracking-[0.3em] uppercase">
          Scroll
        </span>

        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}