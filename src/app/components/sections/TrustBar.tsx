import { TRUST_STATS } from "@/app/content/site";

export function TrustBar() {
  return (
    <section className="py-9" style={{ background: "#1E2A2A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {TRUST_STATS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon className="h-7 w-7 text-secondary flex-shrink-0" strokeWidth={1.75} />
              <div>
                <div className="font-bold text-secondary text-lg leading-tight">{item.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
