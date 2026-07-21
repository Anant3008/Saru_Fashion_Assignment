import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-100 transition-transform duration-200"
      style={{ background: "#25D366" }}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
}