export type NavItem = {
  label: string;
  id: string;
};

export type ServiceItem = {
  emoji: string;
  title: string;
  desc: string;
  badge: string;
};

export type TestimonialItem = {
  name: string;
  location: string;
  initials: string;
  rating: number;
  text: string;
  tag: string;
};

export type WhyUsItem = {
  emoji: string;
  title: string;
  desc: string;
};

export type GalleryItem = {
  id: string;
  label: string;
  tall: boolean;
};

export type ContactDetail = {
  title: string;
  value: string;
};

export type BookingContact = {
  label: string;
  value: string;
  href: string;
  color: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export const SERVICES: ServiceItem[] = [
  {
    emoji: "✂️",
    title: "Designer Blouses",
    desc: "Hand-crafted silk and cotton blouses with intricate embroidery, mirror work, and precision custom fits.",
    badge: "Most Popular",
  },
  {
    emoji: "💍",
    title: "Bridal Wear",
    desc: "Breathtaking lehengas, bridal blouses, and silk sarees crafted to make your wedding day unforgettable.",
    badge: "Premium",
  },
  {
    emoji: "👗",
    title: "Lehenga Stitching",
    desc: "Festive and ceremonial lehengas with perfect drape, premium fabrics, and intricate hand detailing.",
    badge: "",
  },
  {
    emoji: "🌸",
    title: "Kurti & Ethnic Wear",
    desc: "Designer kurtis, anarkalis, and ethnic coordinates stitched to your unique style and comfort.",
    badge: "",
  },
  {
    emoji: "🪡",
    title: "Alterations",
    desc: "Expert alterations that restore and transform your beloved outfits — quick turnaround guaranteed.",
    badge: "Quick Service",
  },
  {
    emoji: "👑",
    title: "Fashion Consultation",
    desc: "Personal styling sessions with our expert designers on fabrics, colours, and silhouettes that suit you.",
    badge: "By Appointment",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Priya Sharma",
    location: "Moti Nagar",
    initials: "PS",
    rating: 5,
    text: "My bridal lehenga from Saru's was absolutely stunning! The detailing, fit, and embroidery work was beyond all expectations. Every single guest complimented me — I felt like a queen.",
    tag: "Bridal Wear",
  },
  {
    name: "Deepa Reddy",
    location: "Kondapur",
    initials: "DR",
    rating: 5,
    text: "Been getting my silk blouses stitched here for 3 years. The craftsmanship is truly unmatched in Hyderabad. They understand exactly what I want without me having to explain twice!",
    tag: "Designer Blouses",
  },
  {
    name: "Ananya Krishnan",
    location: "Madhapur",
    initials: "AK",
    rating: 5,
    text: "The fashion consultation was eye-opening. Saru personally guided me on the right fabrics and colours for my skin tone. The kurti she designed is now my most-complimented outfit.",
    tag: "Consultation",
  },
  {
    name: "Meghna Patel",
    location: "Gachibowli",
    initials: "MP",
    rating: 5,
    text: "Brought my mother's old silk blouse for alteration — they made it look brand new and perfectly fitted. So respectful, skilled, and very affordable. Absolutely recommend!",
    tag: "Alterations",
  },
  {
    name: "Sneha Rao",
    location: "Kondapur",
    initials: "SR",
    rating: 5,
    text: "The lehenga stitched for my sister's wedding was a masterpiece. Patient through every fitting and the result was breathtaking. Saru's is truly a hidden gem in Hyderabad!",
    tag: "Lehenga",
  },
  {
    name: "Kavitha Nair",
    location: "Hitech City",
    initials: "KN",
    rating: 5,
    text: "I ordered three designer kurtis for Diwali and they were delivered right on time. Each one was perfectly stitched and the fabric quality was exceptional. Will definitely order again!",
    tag: "Ethnic Wear",
  },
];

export const WHY_US: WhyUsItem[] = [
  { emoji: "📐", title: "Perfect Fitting", desc: "Multiple fittings until every outfit feels like it was made for your body" },
  { emoji: "🎨", title: "Personalized Design", desc: "Every piece crafted uniquely to your style, occasion, and vision" },
  { emoji: "🧵", title: "Premium Fabrics", desc: "Finest silks, cottons, and designer fabrics sourced with care" },
  { emoji: "💐", title: "Bridal Specialists", desc: "Dedicated bridal team with 12+ years of wedding wear expertise" },
  { emoji: "⏱️", title: "Timely Delivery", desc: "We respect your timeline — always delivered when promised" },
  { emoji: "💎", title: "Affordable Luxury", desc: "Designer quality at honest, transparent prices — no hidden costs" },
];

export const GALLERY: GalleryItem[] = [
  { id: "photo-1617627143750-d86bc21e42bb", label: "Bridal Silk Saree", tall: true },
  { id: "photo-1618901185975-d59f7091bcfe", label: "Festive Designer Look", tall: false },
  { id: "photo-1614940685083-c5409b57da6e", label: "Festive Lehenga", tall: true },
  { id: "photo-1706794831268-d7e99a3c8815", label: "Embroidery Artistry", tall: false },
  { id: "photo-1572470176170-98fa8abcb741", label: "Classic Silk Drape", tall: true },
  { id: "photo-1641305534843-b7447fbc1c21", label: "Master Craftsmanship", tall: false },
  { id: "photo-1739429942851-9083ee185d3d", label: "Signature Style", tall: true },
  { id: "photo-1743012782311-b37269102c12", label: "Embroidered Work", tall: false },
];

export const TRUST_STATS = [
  { icon: "⭐", value: "4.9 / 5.0", label: "Google Rating" },
  { icon: "👗", value: "1,000+", label: "Happy Clients" },
  { icon: "🧵", value: "12+ Years", label: "Expert Craftsmanship" },
  { icon: "📍", value: "2 Locations", label: "Moti Nagar & Kondapur" },
];

export const ABOUT_STATS = [
  { value: "1,000+", label: "Happy Clients" },
  { value: "50+", label: "Bridal Collections" },
  { value: "100%", label: "Custom Stitching" },
  { value: "4.9 ★", label: "Google Rating" },
];

export const BOOKING_CONTACTS: BookingContact[] = [
  { label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210", color: "#25D366" },
  { label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210", color: "#027071" },
  { label: "Instagram", value: "@sarusfashion", href: "https://instagram.com/", color: "#E1306C" },
  { label: "Location", value: "2 Locations", href: "https://maps.google.com", color: "#027071" },
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { title: "Call / WhatsApp", value: "+91 98765 43210" },
  { title: "Email", value: "hello@sarusfashion.com" },
  { title: "Locations", value: "Moti Nagar & Kondapur" },
  { title: "Working Hours", value: "Mon–Sat: 10am – 7pm" },
];

export function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}