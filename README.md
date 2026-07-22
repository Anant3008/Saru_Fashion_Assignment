
  # Saru's Fashion Studio

  Saru's Fashion Studio is a single-page React storefront built from a Figma design. It presents the boutique as a premium destination for bridal wear, designer blouses, lehenga stitching, ethnic wear, alterations, and consultation services.

  *Live Deployed Link :* https://saru-fashion-studio.netlify.app/ 

 ## Implementation Summary
 For this assignment, we focused on designing and developing a modern, responsive website that reflects Saru's Fashion Studio's craftsmanship while providing a clean and intuitive user experience. We researched the business and structured the website to highlight its services, showcase its work through a gallery, and make it easy for potential customers to get in touch. The overall design emphasizes elegant typography, consistent spacing, and a visual hierarchy that guides users naturally through the site.

The website was developed with responsiveness as a priority, ensuring a seamless experience across desktop, tablet, and mobile devices. We implemented smooth scrolling, interactive animations, and a mobile-friendly navigation system to improve usability.

Additionally, we integrated an email inquiry form that allows visitors to contact Saru's Fashion Studio directly from the website. Using EmailJS, customers can submit their name, phone number, email address, service requirement, and message, which are delivered directly to the studio's email inbox without requiring users to open their own email client. This provides a seamless way for potential customers to inquire about services, appointments, or custom tailoring requests while making communication more convenient for both the customer and the business.

<img width="722" height="1600" alt="image" src="https://github.com/user-attachments/assets/c020f18f-2dee-456c-9301-ce713cfab7b6" />


Throughout the project, we prioritized clean, maintainable code and focused on creating a professional digital presence that represents the brand while keeping the interface simple, accessible, and visually appealing. We also paid close attention to responsive layouts, intuitive navigation, and polished UI details to ensure a consistent experience across all devices.

  ## Tech Stack

  - React 18 + TypeScript
  - Vite
  - Tailwind CSS v4
  - Radix UI primitives
  - Lucide icons
  - Motion utilities for subtle page interactions

  ## Project Structure

  - `src/main.tsx` mounts the app.
  - `src/app/App.tsx` is the page composer.
  - `src/app/components/sections/` contains the modular page sections.
  - `src/app/components/shared/` contains reusable visual primitives.
  - `src/app/content/site.ts` stores shared page content and data.
  - `src/styles/` contains global styling, theme tokens, and font imports.

  ## Modular Section Map

  - `NavBar.tsx` handles desktop and mobile navigation.
  - `HeroSection.tsx` contains the landing hero.
  - `TrustBar.tsx` shows the quick proof/stat strip.
  - `AboutSection.tsx` covers the brand story.
  - `ServicesSection.tsx` lists boutique services.
  - `GallerySection.tsx` renders the image gallery and lightbox.
  - `TestimonialsSection.tsx` shows client stories.
  - `WhyChooseUsSection.tsx` explains the value proposition.
  - `BookingCtaSection.tsx` contains the booking call-to-action block.
  - `ContactSection.tsx` provides location details and the inquiry form.
  - `Footer.tsx` and `FloatingWhatsApp.tsx` finish the page shell.

  ## Local Development

  ```bash
  npm i
  npm run dev
  ```

  ## Production Build

  ```bash
  npm run build
  ```

  ## Notes For Teammates

  - Shared copy, navigation entries, and section data live in `src/app/content/site.ts`.
  - If you add a new section, place it under `src/app/components/sections/` and keep `App.tsx` as the composer.
  - Keep generated build output out of version control. The `.gitignore` already excludes `node_modules/` and `dist/`.
