import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, X } from "lucide-react";
import { GALLERY } from "@/app/content/site";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionLabel } from "@/app/components/shared/SectionLabel";
import { useGalleryReveal } from "@/app/hooks/useScrollReveal";

export function GallerySection() {
  const sectionRef = useGalleryReveal<HTMLElement>();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <section ref={sectionRef} id="gallery" className="relative py-20 sm:py-28 bg-[var(--alt-bg)] overflow-hidden w-full">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 sm:h-96 bg-[var(--ring)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <SectionLabel data-reveal>OUR COLLECTION</SectionLabel>
            <h2 data-reveal className="playfair font-bold text-[var(--section-heading)] mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Designs That Speak <span className="italic text-[var(--ring)]">for Themselves</span>
            </h2>
            <p data-reveal className="text-[var(--body-text)] text-sm sm:text-[15px] max-w-lg mx-auto">
              A glimpse into our handcrafted creations, thoughtfully designed to celebrate life's most special moments.
            </p>
          </div>

          <div className="masonry-grid">
            {GALLERY.map((item, i) => (
              <div
                data-reveal
                key={i}
                onClick={() => setLightbox(item.src)}
                className="masonry-item group relative overflow-hidden rounded-2xl cursor-pointer bg-[var(--card-bg)] border border-[var(--card-border)] group-hover:border-[var(--card-hover-border)] transition-all duration-300 shadow-lg"
              >
                <ImageWithFallback
                  src={item.src}
                  alt={`Handcrafted creation by Saru's Fashion Studio - ${item.label}`}
                  className="masonry-card object-cover w-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[var(--ring)] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block mb-1">
                        Handcrafted
                      </span>
                      <h4 className="text-[#FFFFFF] text-xs sm:text-sm font-semibold tracking-wide">
                        {item.label}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[var(--ring)] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-10 sm:mt-14 text-center">
            <a
              href="https://www.instagram.com/sarusfashionstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--ring)]/40 text-[var(--ring)] hover:bg-[var(--ring)] hover:text-[#1A1A1A] font-medium text-xs tracking-wider uppercase px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <Instagram className="w-4 h-4 flex-shrink-0" />
              <span>Follow @sarusfashionstudio on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox}
            alt="Handcrafted creation preview"
            className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-xl shadow-2xl border border-[var(--ring)]/30"
          />
        </div>
      )}
    </>
  );
}
