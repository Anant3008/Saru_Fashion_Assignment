import { MapPin, MessageCircle, Instagram, Phone } from "lucide-react";
import { BOOKING_CONTACTS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

type BookingCtaSectionProps = {
  onNavigate: (id: string) => void;
};

export function BookingCtaSection({ onNavigate }: BookingCtaSectionProps) {
  return (
    <section className="py-20 bg-[#F4F9F9]/50 border-y border-[#027071]/15">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionLabel>Book Now</SectionLabel>
        <h2 className="playfair font-bold text-[#1A2B2B] mb-5" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
          Ready to Design Your <span className="italic text-[#027071]">Dream Outfit?</span>
        </h2>
        <p className="text-[#1A2B2B]/60 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed">
          Book your personal consultation today and take the first step towards wearing something truly made for you.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => onNavigate("contact")}
            className="gold-gradient text-[#1A2B2B] font-semibold text-sm px-10 py-4 rounded-full hover:opacity-90 hover:shadow-xl transition-all hover:-translate-y-px"
          >
            Book Your Appointment
          </button>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#1fba58] transition-all flex items-center gap-2 hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {BOOKING_CONTACTS.map((item, i) => {
            const icon =
              item.label === "WhatsApp" ? <MessageCircle className="w-5 h-5" /> :
              item.label === "Call Us" ? <Phone className="w-5 h-5" /> :
              item.label === "Instagram" ? <Instagram className="w-5 h-5" /> :
              <MapPin className="w-5 h-5" />;

            return (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#027071]/20 rounded-2xl p-4 hover:shadow-md transition-all text-center hover:border-[#027071]/50 hover:-translate-y-0.5"
              >
                <div className="flex justify-center mb-2" style={{ color: item.color }}>
                  {icon}
                </div>
                <div className="text-[#1A2B2B]/45 text-[9px] uppercase tracking-wider mb-0.5">{item.label}</div>
                <div className="text-[#1A2B2B] text-[11px] font-semibold">{item.value}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
