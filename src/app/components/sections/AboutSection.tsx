import { ABOUT_STATS, unsplash } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import aboutImage from "../../../../Collections/J.jpeg";

type AboutSectionProps = {
  onNavigate: (id: string) => void;
};

export function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-5 -left-5 w-full h-full border-2 border-[#C8A96A]/55 rounded-3xl pointer-events-none" />
          <img
            src={aboutImage}
            alt="Bridal wear craftsmanship at Saru's Fashion Studio, Hyderabad"
            className="relative w-full h-[480px] md:h-[560px] object-cover object-top rounded-3xl shadow-[0_20px_60px_rgba(2,112,113,0.15)]"
          />
          <div className="absolute -bottom-7 -right-4 md:-right-7 bg-white rounded-2xl shadow-xl px-6 py-5 border border-[#E8F4F4]">
            <div className="playfair text-4xl font-bold text-[#027071] leading-none">12+</div>
            <div className="text-[11px] text-[#1A2B2B]/60 mt-2 leading-tight max-w-[100px]">
              Years of Crafting Excellence
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <SectionLabel align="left">Our Story</SectionLabel>
          <h2 className="playfair font-bold text-[#1A2B2B] leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Crafting Dreams,<br />
            <span className="italic text-[#027071]">One Stitch at a Time</span>
          </h2>
          <p className="text-[#1A2B2B]/65 text-sm md:text-[15px] leading-[1.85] mb-5">
            Founded in the heart of Hyderabad, Saru's Fashion Studio has been transforming how women experience fashion for over a decade. We believe every woman deserves clothing that celebrates her unique beauty, cultural heritage, and individual style.
          </p>
          <p className="text-[#1A2B2B]/65 text-sm md:text-[15px] leading-[1.85] mb-10">
            From the intricate zardozi on a bridal lehenga to the precise drape of a silk saree blouse, we pour our passion into every stitch. Our experienced designers and master tailors ensure every outfit is not just beautiful — it's a perfect fit.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {ABOUT_STATS.map((stat, i) => (
              <div key={i} className="bg-[#F0F8F8] rounded-2xl px-5 py-4">
                <div className="playfair text-2xl font-bold text-[#027071]">{stat.value}</div>
                <div className="text-[11px] text-[#1A2B2B]/55 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate("contact")}
            className="teal-gradient text-white font-semibold text-sm px-9 py-4 rounded-full hover:opacity-90 hover:shadow-lg transition-all hover:-translate-y-px"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
