import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919989017733"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-100 transition-transform duration-200"
      style={{ background: "#25D366" }}
    >
      <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
    </a>
  );
}
