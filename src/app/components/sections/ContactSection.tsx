import { useEffect, useState } from "react";
import { Clock, ExternalLink, Mail, MapPin, Phone, LoaderCircle, Star, MessageCircle } from "lucide-react";
import { CONTACT_DETAILS, JUSTDIAL_PROFILES, MAPS_OPEN_URL, STUDIO_ADDRESS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useStaggerReveal } from "@/app/hooks/useScrollReveal";
import emailjs from "@emailjs/browser";
import type { ContactDetail, JustdialProfile } from "@/app/content/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  message: string;
};

type FormErrors = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  occasion: "",
  message: "",
};

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15223.96613641702!2d78.3354992!3d17.4601193!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a16380245f%3A0x1a963c0e6b59ab01!2sSaru%27s%20Fashion%20Studio%20-%20Kondapur!5e0!3m2!1sen!2sin!4v1784640137920!5m2!1sen!2sin";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/** Resolve the correct href for a contact card (phone, email, hours). */
function resolveHref(title: string, value: string): string | null {
  if (title === "Call / WhatsApp") return `tel:${value.replace(/\s/g, "")}`;
  if (title === "Email") return `mailto:${value}`;
  return null; // Working Hours — not a link
}

/** WhatsApp quick-chat link alongside phone. */
const WHATSAPP_HREF = "https://wa.me/919989017733";

/* ─── Contact card — shared hover glow style ─────────────────────────────── */
const cardHoverBase =
  "group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 flex gap-3 items-start shadow-md " +
  "transition-all duration-300 hover:-translate-y-[3px] hover:border-[var(--ring)] " +
  "hover:shadow-[0_8px_28px_var(--ring,#E2B49A)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";

export function ContactSection() {
  const sectionRef = useStaggerReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapTimedOut, setMapTimedOut] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    email: "",
    occasion: "",
  });

  const quickDetails: ContactDetail[] = CONTACT_DETAILS.filter(
    (info: ContactDetail) => info.title !== "Address"
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!mapLoaded) setMapTimedOut(true);
    }, 5000);
    return () => window.clearTimeout(timeoutId);
  }, [mapLoaded]);

  const validateForm = () => {
    const newErrors: FormErrors = { name: "", phone: "", email: "", occasion: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Enter your full name.";
      isValid = false;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      isValid = false;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }
    if (!form.occasion) {
      newErrors.occasion = "Choose an occasion or design preference.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(false);
    if (!validateForm()) return;
    try {
      setLoading(true);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          occasion: form.occasion,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-28 bg-[var(--background)] overflow-hidden w-full"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ring)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel data-reveal>GET IN TOUCH</SectionLabel>
          <h2
            data-reveal
            className="playfair font-bold text-[var(--section-heading)] mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Let's Bring Your <span className="italic text-[var(--ring)]">Vision to Life</span>
          </h2>
          <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] max-w-lg mx-auto">
            Whether you're planning for a wedding, a celebration, or a special occasion, we're here
            to create an outfit that's uniquely yours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:items-start">
          {/* ── Left column ── */}
          <div className="flex flex-col gap-5">
            {/* Google Maps embed */}
            <div
              data-reveal
              className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[320px] bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl"
            >
              <iframe
                src={MAPS_EMBED_URL}
                title="Saru's Fashion Studio location"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-90"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setMapLoaded(true)}
              />
              {!mapLoaded && !mapTimedOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--card-bg)]">
                  <LoaderCircle className="w-8 h-8 text-[var(--ring)] animate-spin" />
                </div>
              )}
              {mapTimedOut && !mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--card-bg)] p-6 text-center">
                  <MapPin className="w-8 h-8 text-[var(--ring)] mb-2" />
                  <p className="text-sm font-semibold text-[var(--section-heading)] mb-3">
                    Unable to load map view
                  </p>
                  <a
                    href={MAPS_OPEN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Saru's Fashion Studio in Google Maps"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--ring)] px-5 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[var(--accent-supporting)] hover:text-[#FFFFFF] transition-colors min-h-[44px]"
                  >
                    Open in Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Address card with Get Directions button */}
            <div
              data-reveal
              className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-[var(--ring)] hover:shadow-[0_8px_32px_rgba(226,180,154,0.18)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <a
                  href={MAPS_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Saru's Fashion Studio address in Google Maps"
                  className="flex gap-4 flex-1 min-w-0 group cursor-pointer"
                >
                  <div className="flex h-11 sm:h-12 w-11 sm:w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--ring)]/15 border border-[var(--ring)]/30 text-[var(--ring)] shadow-md transition-transform duration-300 group-hover:scale-110">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ring)]">
                      Studio Address
                    </div>
                    <h3 className="playfair mt-1 text-xl sm:text-2xl font-bold leading-tight text-[var(--primary-heading)]">
                      Saru's Fashion Studio, Kondapur
                    </h3>
                    <p className="mt-2 max-w-xl text-xs sm:text-[14px] font-medium leading-relaxed text-[var(--body-text)]">
                      {STUDIO_ADDRESS}
                    </p>
                  </div>
                </a>

                <a
                  href={MAPS_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to Saru's Fashion Studio"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[var(--ring)] px-5 py-3 text-[12px] font-semibold text-[#1A1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-supporting)] hover:text-[#FFFFFF] hover:shadow-lg sm:w-fit sm:flex-shrink-0"
                >
                  <span>Get directions</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick contact cards: Phone, Email, Hours */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              {quickDetails.map((info: ContactDetail, i: number) => {
                const href = resolveHref(info.title, info.value);

                const icon =
                  info.title === "Call / WhatsApp" ? (
                    <Phone className="w-4 h-4 text-[var(--ring)] transition-transform duration-300 group-hover:scale-110" />
                  ) : info.title === "Email" ? (
                    <Mail className="w-4 h-4 text-[var(--ring)] transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <Clock className="w-4 h-4 text-[var(--ring)]" />
                  );

                // Phone card: show both tel: link + WhatsApp sub-link
                if (info.title === "Call / WhatsApp") {
                  return (
                    <div
                      data-reveal
                      key={i}
                      className={cardHoverBase}
                      style={{ cursor: "default" }}
                    >
                      <div className="mt-0.5 flex-shrink-0">{icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-[var(--ring)] mb-0.5 uppercase tracking-wide font-semibold">
                          {info.title}
                        </div>
                        <a
                          href={`tel:${info.value.replace(/\s/g, "")}`}
                          aria-label={`Call ${info.value}`}
                          className="block text-xs sm:text-[13px] font-semibold leading-snug text-[var(--section-heading)] hover:text-[var(--ring)] transition-colors duration-200 cursor-pointer"
                        >
                          {info.value}
                        </a>
                        <a
                          href={WHATSAPP_HREF}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Chat on WhatsApp"
                          className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#25D366] hover:underline cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                }

                // Email or Hours card
                const CardContent = (
                  <>
                    <div className="mt-0.5 flex-shrink-0">{icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-[var(--ring)] mb-0.5 uppercase tracking-wide font-semibold">
                        {info.title}
                      </div>
                      <div className="text-xs sm:text-[13px] font-medium leading-relaxed text-[var(--section-heading)] break-words">
                        {info.value}
                      </div>
                    </div>
                  </>
                );

                return href ? (
                  <a
                    data-reveal
                    key={i}
                    href={href}
                    aria-label={`${info.title}: ${info.value}`}
                    className={cardHoverBase + " cursor-pointer"}
                    {...(info.title === "Email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div data-reveal key={i} className={cardHoverBase}>
                    {CardContent}
                  </div>
                );
              })}
            </div>

            {/* Justdial profile card */}
            <div
              data-reveal
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5 shadow-lg text-[var(--section-heading)] transition-all duration-300 hover:border-[var(--ring)] hover:shadow-[0_8px_32px_rgba(226,180,154,0.15)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-sm">
                  <div className="text-[10px] text-[var(--ring)] mb-1 uppercase tracking-wide font-bold">
                    Verified Profile
                  </div>
                  <h3 className="playfair text-xl sm:text-2xl font-bold leading-tight text-[var(--primary-heading)]">
                    Find us on Justdial
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[var(--body-text)]">
                    Check our profile for ratings, directions, photos, and quick inquiries.
                  </p>
                </div>

                {JUSTDIAL_PROFILES.map((profile: JustdialProfile) => (
                  <a
                    key={profile.location}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View Saru's Fashion Studio Justdial profile — ${profile.location}`}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-[var(--card-border)] bg-[var(--alt-bg)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ring)] hover:shadow-[0_6px_20px_rgba(226,180,154,0.18)] cursor-pointer sm:max-w-[320px]"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--ring)]/15 border border-[var(--ring)]/30 transition-transform duration-300 group-hover:scale-110">
                      <Star className="h-4 w-4 fill-[var(--ring)] text-[var(--ring)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs sm:text-[13px] font-semibold text-[var(--section-heading)]">
                        Saru's Fashion Studio — {profile.location}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-[var(--secondary-text)]">
                        <span>{profile.rating} rating</span>
                        <span className="opacity-40">/</span>
                        <span>{profile.reviews}</span>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[var(--ring)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: booking form ── */}
          <div
            data-reveal
            className="self-start bg-[var(--card-bg)] rounded-3xl shadow-xl p-5 sm:p-8 border border-[var(--card-border)]"
          >
            <h3 className="playfair text-xl sm:text-2xl font-bold text-[var(--primary-heading)] mb-1.5">
              Book an Appointment
            </h3>
            <p className="text-[var(--secondary-text)] text-xs sm:text-[13px] mb-6 sm:mb-7">
              We'll respond within 24 hrs — or{" "}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="text-[#25D366] font-semibold hover:underline"
              >
                WhatsApp us
              </a>{" "}
              for instant replies!
            </p>

            {submitted ? (
              <div role="status" className="flex flex-col items-center justify-center py-12 sm:py-16 gap-4">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[var(--ring)]/15 border border-[var(--ring)]/30 flex items-center justify-center text-2xl sm:text-3xl">
                  ✅
                </div>
                <div className="playfair text-lg sm:text-xl font-bold text-[var(--ring)]">
                  Appointment Requested!
                </div>
                <p className="text-[var(--body-text)] text-xs sm:text-sm text-center max-w-xs">
                  Thank you! We'll get back to you within 24 hours. You can also WhatsApp us for a
                  quicker response.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitError && (
                  <div role="alert" className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                    Something went wrong sending your inquiry. Please try again, or WhatsApp us directly.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold text-[var(--ring)] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm min-h-[46px] placeholder-[var(--caption-text)] transition-all bg-[var(--input-bg)] focus:outline-none focus:ring-2 ${errors.name
                        ? "border-red-500 text-[var(--section-heading)] focus:border-red-500 focus:ring-red-500/20"
                        : "border-[var(--card-border)] text-[var(--section-heading)] focus:border-[var(--ring)] focus:ring-[var(--ring)]/20"
                      }`}
                    />
                    {errors.name && <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] font-bold text-[var(--ring)] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="XXXXX XXXXX"
                      value={form.phone}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");
                        setForm((current) => ({ ...current, phone: value }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm min-h-[46px] placeholder-[var(--caption-text)] transition-all bg-[var(--input-bg)] focus:outline-none focus:ring-2 ${errors.phone
                        ? "border-red-500 text-[var(--section-heading)] focus:border-red-500 focus:ring-red-500/20"
                        : "border-[var(--card-border)] text-[var(--section-heading)] focus:border-[var(--ring)] focus:ring-[var(--ring)]/20"
                      }`}
                    />
                    {errors.phone && <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-bold text-[var(--ring)] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(event) => {
                      const value = event.target.value;
                      setForm((current) => ({ ...current, email: value }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm min-h-[46px] placeholder-[var(--caption-text)] transition-all bg-[var(--input-bg)] focus:outline-none focus:ring-2 ${errors.email
                      ? "border-red-500 text-[var(--section-heading)] focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--card-border)] text-[var(--section-heading)] focus:border-[var(--ring)] focus:ring-[var(--ring)]/20"
                    }`}
                  />
                  {errors.email && <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-occasion" className="block text-[10px] font-bold text-[var(--ring)] uppercase tracking-wider mb-2">
                    Occasion / Design *
                  </label>
                  <select
                    id="contact-occasion"
                    value={form.occasion}
                    onChange={(event) => setForm((current) => ({ ...current, occasion: event.target.value }))}
                    aria-invalid={Boolean(errors.occasion)}
                    aria-describedby={errors.occasion ? "contact-occasion-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm min-h-[46px] transition-all bg-[var(--input-bg)] text-[var(--section-heading)] appearance-none focus:outline-none focus:ring-2 ${errors.occasion
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--card-border)] focus:border-[var(--ring)] focus:ring-[var(--ring)]/20"
                    }`}
                  >
                    <option value="">Select occasion or design preference...</option>
                    <option>Bridal Wear</option>
                    <option>Designer Blouse</option>
                    <option>Lehenga Crafting</option>
                    <option>Ethnic &amp; Festive Wear</option>
                    <option>Alterations &amp; Fitting</option>
                    <option>Design Consultation</option>
                    <option>Other</option>
                  </select>
                  {errors.occasion && <p id="contact-occasion-error" role="alert" className="mt-1 text-xs text-red-400">{errors.occasion}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-bold text-[var(--ring)] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your requirements, event date, preferred fabrics, or any questions..."
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    className="w-full rounded-xl border border-[var(--card-border)] px-4 py-3 text-sm text-[var(--section-heading)] placeholder-[var(--caption-text)] transition-all bg-[var(--input-bg)] resize-none focus:outline-none focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--ring)] text-[#1A1A1A] font-semibold text-sm py-4 min-h-[48px] rounded-xl hover:bg-[var(--accent-supporting)] hover:text-[#FFFFFF] hover:shadow-[0_8px_25px_var(--ring)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Book an Appointment →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
