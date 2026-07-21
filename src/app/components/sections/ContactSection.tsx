import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_DETAILS, unsplash } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

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

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm(INITIAL_FORM);
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
            <div className="relative rounded-3xl overflow-hidden h-64 bg-[#D8EDED] shadow-sm">
              <img
                src={unsplash("photo-1614940685083-c5409b57da6e", 800, 480)}
                alt="Saru's Fashion Studio location"
                className="w-full h-full object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="teal-gradient text-white rounded-full p-4 shadow-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-7 py-3 text-center shadow-lg">
                  <div className="font-semibold text-[#1A2B2B] text-sm">Saru's Fashion Studio</div>
                  <div className="text-[#1A2B2B]/55 text-[12px] mt-0.5">Moti Nagar & Kondapur, Hyderabad</div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#027071] text-xs font-semibold underline underline-offset-2 hover:text-[#C8A96A] transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
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
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                      className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#1A2B2B]/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full border border-[#C8E4E4] rounded-xl px-4 py-3 text-sm text-[#1A2B2B] placeholder-[#1A2B2B]/28 focus:outline-none focus:border-[#027071] focus:ring-2 focus:ring-[#027071]/12 transition-all bg-[#FAFDFB]"
                  />
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

                <button type="submit" className="w-full teal-gradient text-white font-semibold text-sm py-4 rounded-xl hover:opacity-90 hover:shadow-lg transition-all mt-1">
                  Send Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
