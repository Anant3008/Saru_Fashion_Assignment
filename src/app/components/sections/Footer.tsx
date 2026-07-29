import { Facebook, Instagram, MapPin, MessageCircle, Phone, Clock, Mail } from "lucide-react";
import { BrandMark } from "@/app/components/shared/BrandMark";
import { CONTACT, CONTACT_DETAILS, JUSTDIAL_PROFILES, NAV_ITEMS, STUDIO_ADDRESS } from "@/app/content/site";

type FooterProps = {
  onNavigate: (id: string) => void;
};

const WORKING_HOURS = CONTACT_DETAILS.find((detail) => detail.title === "Working Hours")?.value ?? "";
const EMAIL = CONTACT_DETAILS.find((detail) => detail.title === "Email")?.value ?? "";

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#161E1E] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.3fr] gap-10 mb-14">
          <div>
            <div className="mb-5">
              <BrandMark size="lg" />
            </div>
            <p className="text-white/45 text-[13px] leading-relaxed mb-6">
              Hyderabad's trusted boutique for custom tailoring, bridal wear, and designer ethnic fashion since 2012.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/sarusfashionstudio", label: "Instagram" },
                { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/sarusfashions/", label: "Facebook" },
                { icon: <MessageCircle className="w-4 h-4" />, href: "https://wa.me/919989017733", label: "WhatsApp" },
                { icon: <span className="text-[10px] font-black leading-none">JD</span>, href: JUSTDIAL_PROFILES[0].href, label: "Justdial" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-foreground hover:border-secondary transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id}>
                  <button onClick={() => onNavigate(id)} className="text-white/42 text-[13px] hover:text-secondary transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/42 text-[13px] leading-relaxed">
                  {STUDIO_ADDRESS}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href={`tel:${CONTACT.phone}`} className="text-white/42 text-[13px] hover:text-secondary transition-colors">
                  {CONTACT.displayPhone}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-white/42 text-[13px]">{EMAIL}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-white/42 text-[13px]">{WORKING_HOURS}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/25 text-[11px]">© {new Date().getFullYear()} Saru's Fashion Studio, Hyderabad. All rights reserved.</span>
          <span className="text-white/25 text-[11px]">Crafted with love in Hyderabad ♥</span>
        </div>
      </div>
    </footer>
  );
}
