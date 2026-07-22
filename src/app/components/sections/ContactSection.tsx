import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone, LoaderCircle } from "lucide-react";
import { CONTACT_DETAILS, unsplash } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import emailjs from "@emailjs/browser";

type FormState = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  message: string;
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

const MAPS_OPEN_URL = "https://maps.app.goo.gl/Zb9ibAGTXeFxH5A79";

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapTimedOut, setMapTimedOut] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!mapLoaded) {
        setMapTimedOut(true);
      }
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [mapLoaded]);

  const validateForm = () => {
    const newErrors = {
      phone: "",
      email: "",
    };

    let isValid = true;
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      isValid = false;
    }
    if (
      form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setHasSubmitted(true);

    if (!validateForm()) return;

    try {
      setLoading(true);

      await emailjs.send(
        "service_zxq8uju",
        "template_cg23ylg",
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          occasion: form.occasion,
          message: form.message,
        },
        "VZu5eooLBTrLzRSMv"
      );

      setSubmitted(true);
      setForm(INITIAL_FORM);

      setErrors({
        phone: "",
        email: "",
      });

      setHasSubmitted(false);

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      console.log("EmailJS Error: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="playfair font-bold text-[#1A2B2B] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Visit Our Studio
          </h2>
          <p className="text-[#1A2B2B]/55 text-[15px] max-w-lg mx-auto">
            We'd love to meet you. Drop by our boutique or send an inquiry — we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            <div className="relative rounded-3xl overflow-hidden h-80 bg-[#D8EDED] shadow-sm">
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
                    <h3 className="playfair text-xl font-bold text-[#1A2B2B] mb-2">Map preview unavailable</h3>
                    <p className="text-[#1A2B2B]/60 text-sm leading-relaxed mb-5">
                      The embedded map is taking too long to load. You can still open the location directly in Google Maps.
                    </p>
                    <a
                      href={MAPS_OPEN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#027071] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#015859]"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {CONTACT_DETAILS.map((info, i) => {
                const icon =
                  info.title === "Call / WhatsApp" ? <Phone className="w-4 h-4 text-[#027071]" /> :
                    info.title === "Email" ? <Mail className="w-4 h-4 text-[#027071]" /> :
                      info.title === "Locations" ? <MapPin className="w-4 h-4 text-[#027071]" /> :
                        <Clock className="w-4 h-4 text-[#027071]" />;

                return (
                  <div key={i} className="bg-white border border-[#E8F4F4] rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                    <div className="mt-0.5 flex-shrink-0">{icon}</div>
                    <div>
                      <div className="text-[10px] text-[#1A2B2B]/40 mb-0.5 uppercase tracking-wide">{info.title}</div>
                      <div className="text-[13px] font-medium text-[#1A2B2B]">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(2,112,113,0.07)] p-8 border border-[#E8F4F4]">
            <h3 className="playfair text-2xl font-bold text-[#1A2B2B] mb-1.5">Send an Inquiry</h3>
            <p className="text-[#1A2B2B]/45 text-[13px] mb-7">
              We'll respond within 24 hrs — or{" "}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold">
                WhatsApp us
              </a>{" "}
              for instant replies!
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F8F8] flex items-center justify-center text-3xl">✅</div>
                <div className="playfair text-xl font-bold text-[#027071]">Inquiry Sent!</div>
                <p className="text-[#1A2B2B]/55 text-sm text-center max-w-xs">
                  Thank you! We'll get back to you within 24 hours. You can also WhatsApp us for a quicker response.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");

                        setForm((current) => ({
                          ...current,
                          phone: value,
                        }));

                        if (hasSubmitted) {
                          setErrors((prev) => ({
                            ...prev,
                            phone:
                              value.length === 0 ||
                                /^[6-9]\d{9}$/.test(value)
                                ? ""
                                : "Enter a valid 10-digit phone number.",
                          }));
                        }
                      }}

                      className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB]"
                    />
                    {hasSubmitted && errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(event) => {
                      const value = event.target.value;
                      setForm((current) => ({
                        ...current,
                        email: value,
                      }));

                      if (hasSubmitted) {
                        setErrors((prev) => ({
                          ...prev,
                          email:
                            value === "" ||
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                              ? ""
                              : "Enter a valid email address.",
                        }));
                      }
                    }}
                    className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB]"
                  />
                  {hasSubmitted && errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Occasion / Service *</label>
                  <select
                    required
                    value={form.occasion}
                    onChange={(event) => setForm((current) => ({ ...current, occasion: event.target.value }))}
                    className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB] appearance-none"
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
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements, event date, preferred fabrics, or any questions..."
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB] resize-none"
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
