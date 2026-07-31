import { useEffect } from "react";
import { ThemeProvider } from "@/app/context/ThemeContext";
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
import { BackToTop } from "@/app/components/shared/BackToTop";
import saruLogo from "@/imports/saru_fashion.jpg";

function MainContent() {
  useEffect(() => {
    document.body.style.overflow = "";
    document.title = "Saru's Fashion Studio | Luxury Boutique";

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
    <div className="min-h-screen bg-[var(--background)] text-[var(--body-text)] overflow-x-hidden w-full max-w-[100vw]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--background); }
        ::-webkit-scrollbar-thumb { background: rgba(226,180,154,0.35); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(226,180,154,0.6); }
        .playfair { font-family: 'Playfair Display', serif; }
        .masonry-grid {
          column-count: 1;
          column-gap: 16px;
        }
        @media (min-width: 480px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 768px) { .masonry-grid { column-count: 3; } }
        @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 16px;
        }
      `}</style>

      <NavBar onNavigate={navigateTo} />
      <main>
        <HeroSection onNavigate={navigateTo} />
        <TrustBar />
        <AboutSection onNavigate={navigateTo} />
        <ServicesSection />
        <GallerySection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <BookingCtaSection onNavigate={navigateTo} />
        <ContactSection />
      </main>
      <Footer onNavigate={navigateTo} />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}