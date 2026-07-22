export type NavItem = {
  label: string;
  id: string;
};

export type ServiceItem = {
  emoji: string;
  title: string;
  desc: string;
  badge: string;
  image: {
    src: string;
    alt: string;
  };
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
  src: string;
  label: string;
  tall: boolean;
};

export type ContactDetail = {
  title: string;
  value: string;
};

export type JustdialProfile = {
  location: string;
  rating: string;
  reviews: string;
  href: string;
};

export type BookingContact = {
  label: string;
  value: string;
  href: string;
  color: string;
};

export const STUDIO_ADDRESS =
  "1st Floor, Ram Landmark, 244/B, Shirdi Sai St, Sri Ram Nagar, Kondapur, Hyderabad-500084, Telangana";

export const MAPS_OPEN_URL = "https://maps.app.goo.gl/Zb9ibAGTXeFxH5A79";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export const CONTACT = {
  phone: "+919989017733",
  displayPhone: "+91 99890 17733",
};

export const SERVICES: ServiceItem[] = [
  {
    emoji: "✂️",
    title: "Blouse & Lehenga Fabrics",
    desc: "Premium fabrics selected for flawless drape, comfort, and custom stitching across everyday and occasion wear.",
    badge: "Custom Stitching",
    image: {
      src: new URL("../../../Images/C.jpg", import.meta.url).href,
      alt: "Blouse and lehenga fabrics with detailed embroidery work",
    },
  },
  {
    emoji: "💍",
    title: "Designer Sarees & Lehengas",
    desc: "Elegant silhouettes, rich textures, and festive drapes tailored for standout celebrations and special events.",
    badge: "Signature",
    image: {
      src: new URL("../../../Images/B.jpg", import.meta.url).href,
      alt: "Designer lehenga with ornate embellished waist detailing",
    },
  },
  {
    emoji: "👗",
    title: "Bridal Blouses",
    desc: "Statement bridal blouses with refined finishing, supportive fits, and intricate detailing for wedding looks.",
    badge: "Bridal",
    image: {
      src: new URL("../../../Images/E.jpg", import.meta.url).href,
      alt: "Bridal blouse fabric with decorative border and embroidery",
    },
  },
  {
    emoji: "🌸",
    title: "Maggam Work & Computer Embroidery",
    desc: "Fine maggam work, neat computer embroidery, and ornate finishing for a polished, handcrafted finish.",
    badge: "Fine Detail",
    image: {
      src: new URL("../../../Images/A.jpg", import.meta.url).href,
      alt: "Intricate maggam embroidery on a bright orange fabric",
    },
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
  { src: new URL("../../../Collections/I.jpeg", import.meta.url).href, label: "Intricate I", tall: true },
  { src: new URL("../../../Collections/J.jpeg", import.meta.url).href, label: "Red Bridal J", tall: true },
  { src: new URL("../../../Collections/A.jpg", import.meta.url).href, label: "Floral Border A", tall: true },
  { src: new URL("../../../Collections/B.jpg", import.meta.url).href, label: "Classic Border B", tall: false },
  { src: new URL("../../../Collections/F.jpg", import.meta.url).href, label: "Floral F", tall: true },
  { src: new URL("../../../Collections/G.jpg", import.meta.url).href, label: "Mint Blouse G", tall: false },
  { src: new URL("../../../Collections/E.jpg", import.meta.url).href, label: "Saree Waist E", tall: true },
  { src: new URL("../../../Collections/D.jpg", import.meta.url).href, label: "Neckline D", tall: false },
  { src: new URL("../../../Collections/H.jpg", import.meta.url).href, label: "Blue Border H", tall: false },
];

export const TRUST_STATS = [
  { icon: "⭐", value: "4.7 / 5.0", label: "Google Rating" },
  { icon: "👗", value: "1,000+", label: "Happy Clients" },
  { icon: "🧵", value: "12+ Years", label: "Expert Craftsmanship" },
  { icon: "📍", value: "Kondapur", label: "Hyderabad Studio" },
];

export const ABOUT_STATS = [
  { value: "1,000+", label: "Happy Clients" },
  { value: "50+", label: "Bridal Collections" },
  { value: "100%", label: "Custom Stitching" },
  { value: "4.7 ★", label: "Google Rating" },
];

export const BOOKING_CONTACTS: BookingContact[] = [

  { label: "WhatsApp", value: "+91 99890 17733", href: "https://wa.me/919989017733", color: "#25D366" },
  { label: "Call Us", value: "+91 99890 17733", href: "tel:+919989017733", color: "#027071" },
  { label: "Instagram", value: "@sarusfashionstudio", href: "https://www.instagram.com/sarusfashionstudio", color: "#E1306C" },
  { label: "Location", value: "Kondapur Studio", href: MAPS_OPEN_URL, color: "#027071" },
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { title: "Call / WhatsApp", value: "+91 99890 17733" },
  { title: "Email", value: "sarusfashions@gmail.com" },
  { title: "Address", value: STUDIO_ADDRESS },
  { title: "Working Hours", value: "Mon–Sat: 10am – 7pm" },
];

export const JUSTDIAL_PROFILES: JustdialProfile[] = [
  {
    location: "Kondapur",
    rating: "4.7",
    reviews: "44 ratings",
    href: "https://www.justdial.com/Hyderabad/Sarus-Fashion-Studio-Kondapur-Kondapur/040PXX40-XX40-250821155351-P3P8_BZDET/reviews",
  },
];

export function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}
