import { useEffect, useState } from "react";
import { Clock, ExternalLink, Mail, MapPin, Phone, LoaderCircle, Star } from "lucide-react";
import { CONTACT_DETAILS, JUSTDIAL_PROFILES, MAPS_OPEN_URL, STUDIO_ADDRESS } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
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

export function ContactSection() {
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

  const quickDetails: ContactDetail[] = CONTACT_DETAILS.filter((info: ContactDetail) => info.title !== "Address");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!mapLoaded) {
        setMapTimedOut(true);
      }
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [mapLoaded]);

  const validateForm = () => {
    const newErrors: FormErrors = {
      name: "",
      phone: "",
      email: "",
      occasion: "",
    };

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
      newErrors.occasion = "Choose an occasion or service.";
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

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      console.log("EmailJS Error: ", error);
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="playfair font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Visit Our Studio
          </h2>
          <p className="text-foreground/55 text-[15px] max-w-lg mx-auto">
            We'd love to meet you. Drop by our boutique or send an inquiry — we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 lg:items-start">
          <div className="flex flex-col gap-5">
            <div className="relative rounded-3xl overflow-hidden h-[320px] bg-[#D8EDED] shadow-sm">
              <iframe
                src={MAPS_EMBED_URL}
                title="Saru's Fashion Studio location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setMapLoaded(true)}
              />
              {mapTimedOut && !mapLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm px-6 text-center">
                  <div className="max-w-sm">
                    <div className="teal-gradient text-white rounded-full p-4 shadow-xl w-fit mx-auto mb-4">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="playfair text-xl font-bold text-foreground mb-2">Map preview unavailable</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                      The embedded map is taking too long to load. You can still open the location directly in Google Maps.
                    </p>
                    <a
                      href={MAPS_OPEN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#015859]"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[#E8F4F4] bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(2,112,113,0.06)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_rgba(2,112,113,0.22)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/65">Studio Address</div>
                    <h3 className="playfair mt-1 text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                      Saru's Fashion Studio, Kondapur
                    </h3>
                    <p className="mt-2 max-w-xl text-[14px] font-medium leading-relaxed text-foreground/70">{STUDIO_ADDRESS}</p>
                  </div>
                </div>

                <a
                  href={MAPS_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[12px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#015859] hover:shadow-lg sm:w-fit sm:flex-shrink-0"
                >
                  Get directions
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {quickDetails.map((info: ContactDetail, i: number) => {
                const icon =
                  info.title === "Call / WhatsApp" ? <Phone className="w-4 h-4 text-primary" /> :
                    info.title === "Email" ? <Mail className="w-4 h-4 text-primary" /> :
                      <Clock className="w-4 h-4 text-primary" />;

                return (
                  <div key={i} className="bg-white border border-[#E8F4F4] rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                    <div className="mt-0.5 flex-shrink-0">{icon}</div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-foreground/40 mb-0.5 uppercase tracking-wide">{info.title}</div>
                      <div className="text-[13px] font-semibold leading-relaxed text-foreground break-words">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-foreground border border-foreground rounded-2xl p-5 shadow-sm text-white">
              <div className="flex flex-col gap-5 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
                <div className="max-w-sm">
                  <div className="text-[10px] text-secondary mb-1 uppercase tracking-wide">Verified profile</div>
                  <h3 className="playfair text-2xl font-bold leading-tight">Find us on Justdial</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/58">
                    Check our profile for ratings, directions, photos, and quick inquiries.
                  </p>
                </div>

                {JUSTDIAL_PROFILES.map((profile: JustdialProfile) => (
                  <a
                    key={profile.location}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 transition-all hover:-translate-y-0.5 hover:bg-white/12 min-[560px]:max-w-[340px]"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-secondary/18">
                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-semibold text-white">Saru's Fashion Studio - {profile.location}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-white/60">
                        <span>{profile.rating} rating on Justdial</span>
                        <span className="text-white/25">/</span>
                        <span>{profile.reviews}</span>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="self-start bg-white rounded-3xl shadow-[0_4px_40px_rgba(2,112,113,0.07)] p-6 sm:p-8 border border-[#E8F4F4]">
            <h3 className="playfair text-2xl font-bold text-foreground mb-1.5">Send an Inquiry</h3>
            <p className="text-foreground/45 text-[13px] mb-7">
              We'll respond within 24 hrs — or{" "}
              <a href="https://wa.me/919989017733" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold">
                WhatsApp us
              </a>{" "}
              for instant replies!
            </p>

            {submitted ? (
              <div role="status" area-live="polite" className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F8F8] flex items-center justify-center text-3xl" area-hidden="ture">✅</div>
                <div className="playfair text-xl font-bold text-primary">Inquiry Sent!</div>
                <p className="text-foreground/55 text-sm text-center max-w-xs">
                  Thank you! We'll get back to you within 24 hours. You can also WhatsApp us for a quicker response.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitError && (
                  <div role="alert" area-live="assertive" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    Somthing wnt wrong sending your inquiry. Please try again, or WhatsApp us directly.
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-foreground/28 transition-all bg-[#FAFDFB] focus:outline-none focus:ring-2 ${errors.name
                        ? "border-red-400 text-foreground focus:border-red-500 focus:ring-red-500/12"
                        : "border-[#C8E4E4] text-foreground focus:border-primary focus:ring-primary/12"
                        }`}
                    />
                    {errors.name && <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="XXXXX XXXXX"
                      value={form.phone}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");

                        setForm((current) => ({
                          ...current,
                          phone: value,
                        }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-foreground/28 transition-all bg-[#FAFDFB] focus:outline-none focus:ring-2 ${errors.phone
                        ? "border-red-400 text-foreground focus:border-red-500 focus:ring-red-500/12"
                        : "border-[#C8E4E4] text-foreground focus:border-primary focus:ring-primary/12"
                        }`}
                    />
                    {errors.phone && <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(event) => {
                      const value = event.target.value;
                      setForm((current) => ({
                        ...current,
                        email: value,
                      }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm placeholder-foreground/28 transition-all bg-[#FAFDFB] focus:outline-none focus:ring-2 ${errors.email
                      ? "border-red-400 text-foreground focus:border-red-500 focus:ring-red-500/12"
                      : "border-[#C8E4E4] text-foreground focus:border-primary focus:ring-primary/12"
                      }`}
                  />
                  {errors.email && <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Occasion / Service *</label>
                  <select
                    id="contact-occasion"
                    value={form.occasion}
                    onChange={(event) => setForm((current) => ({ ...current, occasion: event.target.value }))}
                    aria-invalid={Boolean(errors.occasion)}
                    aria-describedby={errors.occasion ? "contact-occasion-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-all bg-[#FAFDFB] appearance-none focus:outline-none focus:ring-2 ${errors.occasion
                      ? "border-red-400 text-foreground focus:border-red-500 focus:ring-red-500/12"
                      : "border-[#C8E4E4] text-foreground focus:border-primary focus:ring-primary/12"
                      }`}
                  >
                    <option value="">Select occasion or service...</option>
                    <option>Bridal Wear</option>
                    <option>Designer Blouse</option>
                    <option>Lehenga Stitching</option>
                    <option>Kurti / Ethnic Wear</option>
                    <option>Alterations</option>
                    <option>Fashion Consultation</option>
                    <option>Other</option>
                  </select>
                  {errors.occasion && <p id="contact-occasion-error" role="alert" className="mt-1 text-xs text-red-500">{errors.occasion}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your requirements, event date, preferred fabrics, or any questions..."
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    className="w-full rounded-xl border border-[#C8E4E4] px-4 py-3 text-sm text-foreground placeholder-foreground/28 transition-all bg-[#FAFDFB] resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12"
                  />
                </div>

                <button type="submit" disabled={loading} className="w-full teal-gradient text-white font-semibold text-sm py-4 rounded-xl hover:opacity-90 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Inquiry →"
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
