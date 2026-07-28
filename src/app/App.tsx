import { useEffect } from "react";
import { NavBar } from "@/app/components/sections/NavBar";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { TrustBar } from "@/app/components/sections/TrustBar";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { ServicesSection } from "@/app/components/sections/ServicesSection";
import { GallerySection } from "@/app/components/sections/GallerySection";
import { TestimonialsSection } from "@/app/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/app/components/sections/WhyChooseUsSection";
import { BookingCtaSection } from "@/app/components/sections/BookingCtaSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { Footer } from "@/app/components/sections/Footer";
import { FloatingWhatsApp } from "@/app/components/sections/FloatingWhatsApp";
import saruLogo from "@/imports/saru_fashion.jpg";

export default function App() {
  useEffect(() => {
    document.body.style.overflow = "";
    document.title = "Saru's Fashion Studio";

    const iconId = "saru-favicon";
    let link = document.querySelector<HTMLLinkElement>(`link#${iconId}`);

    if (!link) {
      link = document.createElement("link");
      link.id = iconId;
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.type = "image/jpeg";
    link.href = saruLogo;

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const navigateTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFDFB] text-[#1A2B2B] overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(2,112,113,0.28); border-radius: 3px; }
        .playfair { font-family: 'Playfair Display', serif; }
        .masonry-grid {
          column-count: 2;
          column-gap: 16px;
        }
        @media (min-width: 640px) { .masonry-grid { column-count: 3; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 4; } }
        .masonry-item {
          display: block;
          width: 100%;
          margin-bottom: 16px;
          break-inside: avoid;
        }
        .masonry-card { display: block; width: 100%; height: auto; }
        .hero-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(200,169,106,0.07) 0,
            rgba(200,169,106,0.07) 1px,
            transparent 0,
            transparent 50%
          );
          background-size: 14px 14px;
        }
        .gold-gradient { background: linear-gradient(135deg, #C8A96A 0%, #e8c880 50%, #C8A96A 100%); }
        .teal-gradient { background: linear-gradient(135deg, #027071 0%, #015859 100%); }
        .charcoal-section { background: #1E2A2A; }
        .teal-gradient-deep { background: #1E2A2A; }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
        .float-anim { animation: float 3s ease-in-out infinite; }
      `}</style>

      <NavBar onNavigate={navigateTo} />
      <HeroSection onNavigate={navigateTo} />
      <TrustBar />
      <AboutSection onNavigate={navigateTo} />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <BookingCtaSection onNavigate={navigateTo} />
      <ContactSection />
      <Footer onNavigate={navigateTo} />
      <FloatingWhatsApp />
    </div>
  );
}