import { WHY_US } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Why Saru's</SectionLabel>
          <h2 className="playfair font-bold text-[#1A2B2B] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            The Saru's Difference
          </h2>
          <p className="text-[#1A2B2B]/55 text-[15px] max-w-lg mx-auto">
            Everything we do is guided by a single commitment — making you feel extraordinary in every outfit we create.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {WHY_US.map((item, i) => (
            <div key={i} className="flex gap-5 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-[#F0F8F8] flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#027071] transition-all duration-300 shadow-sm">
                <item.icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A2B2B] text-[15px] mb-1.5 group-hover:text-[#027071] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#1A2B2B]/58 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
