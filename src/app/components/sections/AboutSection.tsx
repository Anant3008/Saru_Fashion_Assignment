import { ABOUT_STATS} from "@/app/content/site";
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
          <div className="absolute -top-5 -left-5 w-full h-full border-2 border-secondary/55 rounded-3xl pointer-events-none" />
          <img
            src={aboutImage}
            alt="Bridal wear craftsmanship at Saru's Fashion Studio, Hyderabad"
            className="relative w-full h-[480px] md:h-[560px] object-cover object-top rounded-3xl shadow-[0_20px_60px_rgba(2,112,113,0.15)]"
          />
          <div className="absolute -bottom-7 -right-4 md:-right-7 bg-white rounded-2xl shadow-xl px-6 py-5 border border-[#E8F4F4]">
            <div className="playfair text-4xl font-bold text-primary leading-none">19+</div>
            <div className="text-[11px] text-foreground/60 mt-2 leading-tight max-w-[100px]">
              Tailored Designs for Every Occasion
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <SectionLabel align="left">Our Story</SectionLabel>
          <h2 className="playfair font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Where Every Design,<br />
            <span className="italic text-primary">Begins with You</span>
          </h2>
          <p className="text-foreground/65 text-sm md:text-[15px] leading-[1.9] mb-5">
            At Saru's Fashion Studio, we believe every outfit should be as unique as the person wearing it. From elegant bridal blouses to custom ethnic wear, every design is thoughtfully tailored with precision, creativity, and attention to detail.
          </p>

          <p className="text-foreground/65 text-sm md:text-[15px] leading-[1.9] mb-10">
            Our passion lies in creating timeless pieces that blend traditional craftsmanship with contemporary elegance. Whether it's a wedding, festive celebration, or a special occasion, we work closely with every client to bring their vision to life through personalized designs and impeccable tailoring.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {ABOUT_STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-[#E8F4F4] rounded-2xl px-5 py-5 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="playfair text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-[11px] text-foreground/55 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/60 italic mb-8">
             Every stitch tells a story. Every design reflects your individuality.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="teal-gradient text-white font-semibold text-sm px-9 py-4 rounded-full hover:opacity-90 hover:shadow-lg transition-all hover:-translate-y-px"
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
