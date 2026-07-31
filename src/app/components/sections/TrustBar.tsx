import { TRUST_STATS } from "@/app/content/site";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";

export function TrustBar() {
  const sectionRef = useStaggerReveal<HTMLElement>({ y: 24, blur: 6, stagger: 0.05 });

  return (
    <section ref={sectionRef} className="py-7 sm:py-9 bg-[var(--alt-bg)] border-y border-[var(--card-border)] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {TRUST_STATS.map((item, i) => (
            <div data-reveal key={i} className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--ring)]/10 border border-[var(--ring)]/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-[var(--ring)]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[var(--ring)] text-base sm:text-lg leading-tight truncate">{item.value}</div>
                <div className="text-[var(--secondary-text)] text-[11px] sm:text-xs mt-0.5 truncate">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
