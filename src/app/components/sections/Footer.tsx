import { Facebook, Instagram, MapPin, MessageCircle, Phone, Clock, Mail } from "lucide-react";
import { BrandMark } from "@/app/components/shared/BrandMark";
import { CONTACT, CONTACT_DETAILS, JUSTDIAL_PROFILES, MAPS_OPEN_URL, NAV_ITEMS, STUDIO_ADDRESS } from "@/app/content/site";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";

type FooterProps = {
  onNavigate: (id: string) => void;
};

const WORKING_HOURS = CONTACT_DETAILS.find((detail) => detail.title === "Working Hours")?.value ?? "";
const EMAIL = CONTACT_DETAILS.find((detail) => detail.title === "Email")?.value ?? "";

export function Footer({ onNavigate }: FooterProps) {
  const footerRef = useStaggerReveal<HTMLElement>({ start: "top 92%", stagger: 0.05 });

  const socialLinks = [
    {
      icon: <Instagram className="w-4 h-4" />,
      href: "https://www.instagram.com/sarusfashionstudio",
      label: "Follow us on Instagram",
    },
    {
      icon: <Facebook className="w-4 h-4" />,
      href: "https://www.facebook.com/sarusfashions/",
      label: "Find us on Facebook",
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      href: "https://wa.me/919989017733",
      label: "Chat with us on WhatsApp",
    },
    {
      icon: <span className="text-[10px] font-black leading-none">JD</span>,
      href: JUSTDIAL_PROFILES[0]?.href ?? "#",
      label: "View our Justdial profile",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[var(--alt-bg)] text-[var(--body-text)] pt-14 sm:pt-16 pb-8 border-t border-[var(--card-border)] w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.3fr] gap-8 sm:gap-10 mb-12 sm:mb-14">

          {/* Brand + Social */}
          <div data-reveal>
            <div className="mb-5">
              <BrandMark size="lg" />
            </div>
            <p className="text-[var(--body-text)] text-xs sm:text-[13px] leading-relaxed mb-6 max-w-sm">
              Hyderabad's trusted studio for bridal wear, handcrafted creations, and personalized
              occasion design.
            </p>

            {/* Social icons with hover scale + glow */}
            <div className="flex gap-2.5 flex-wrap" role="list" aria-label="Social media links">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  role="listitem"
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[var(--card-bg)] border border-[var(--ring)]/30 text-[var(--ring)] flex items-center justify-center transition-all duration-300 shadow-sm hover:bg-[var(--ring)] hover:text-[#1A1A1A] hover:border-[var(--ring)] hover:scale-110 hover:shadow-[0_4px_16px_rgba(226,180,154,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div data-reveal>
            <h4 className="text-[11px] font-bold text-[var(--ring)] uppercase tracking-[0.2em] mb-4 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3" role="list">
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    aria-label={`Navigate to ${label} section`}
                    className="text-[var(--section-heading)] text-xs sm:text-[13px] hover:text-[var(--ring)] transition-colors duration-200 py-1 inline-block relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded"
                  >
                    {label}
                    {/* underline animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--ring)] transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details — all items clickable where appropriate */}
          <div data-reveal>
            <h4 className="text-[11px] font-bold text-[var(--ring)] uppercase tracking-[0.2em] mb-4 sm:mb-5">
              Contact Us
            </h4>
            <div className="space-y-3.5 sm:space-y-4">

              {/* Address — opens Google Maps */}
              <a
                href={MAPS_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open studio location in Google Maps"
                className="flex gap-3 group cursor-pointer hover:text-[var(--ring)] transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 text-[var(--ring)] flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[var(--body-text)] text-xs sm:text-[13px] leading-relaxed group-hover:text-[var(--ring)] transition-colors duration-200">
                  {STUDIO_ADDRESS}
                </span>
              </a>

              {/* Phone — tel: link */}
              <a
                href={`tel:${CONTACT.phone}`}
                aria-label={`Call us at ${CONTACT.displayPhone}`}
                className="flex gap-3 items-center group cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[var(--ring)] flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[var(--body-text)] text-xs sm:text-[13px] hover:text-[var(--ring)] transition-colors duration-200">
                  {CONTACT.displayPhone}
                </span>
              </a>

              {/* Email — mailto: link */}
              <a
                href={`mailto:${EMAIL}`}
                aria-label={`Email us at ${EMAIL}`}
                className="flex gap-3 items-center group cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[var(--ring)] flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[var(--body-text)] text-xs sm:text-[13px] hover:text-[var(--ring)] transition-colors duration-200 break-all">
                  {EMAIL}
                </span>
              </a>

              {/* Working Hours — informational, not a link */}
              <div className="flex gap-3 items-center">
                <Clock className="w-4 h-4 text-[var(--ring)] flex-shrink-0" />
                <span className="text-[var(--body-text)] text-xs sm:text-[13px]">
                  {WORKING_HOURS}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-reveal
          className="border-t border-[var(--card-border)] pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left"
        >
          <span className="text-[var(--secondary-text)] text-[10px] sm:text-[11px]">
            © {new Date().getFullYear()} Saru's Fashion Studio, Hyderabad. All rights reserved.
          </span>
          <span className="text-[var(--secondary-text)] text-[10px] sm:text-[11px]">
            Crafted with elegance in Hyderabad ♥
          </span>
        </div>
      </div>
    </footer>
  );
}
