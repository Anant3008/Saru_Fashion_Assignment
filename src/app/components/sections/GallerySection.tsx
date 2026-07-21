import { useEffect, useState } from "react";
import { Instagram, X } from "lucide-react";
import { GALLERY, unsplash } from "@/app/content/site";
import { SectionLabel } from "@/app/components/shared/SectionLabel";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <section id="gallery" className="py-24 bg-[#FAFDFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="playfair font-bold text-[#1A2B2B] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Featured Collection
            </h2>
            <p className="text-[#1A2B2B]/55 text-[15px] max-w-lg mx-auto">
              A glimpse into the artistry, craftsmanship, and elegance we pour into every creation.
            </p>
          </div>

          <div className="masonry-grid">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="masonry-item group relative overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setLightbox(img.id)}
              >
                <img
                  src={unsplash(img.id, 600, img.tall ? 800 : 480)}
                  alt={img.label}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  style={{ display: "block" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#015859]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold">{img.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#027071] text-[#027071] font-semibold text-sm px-9 py-4 rounded-full hover:bg-[#027071] hover:text-white transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img
            src={unsplash(lightbox, 1200, 900)}
            alt="Gallery preview"
            className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
