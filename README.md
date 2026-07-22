
  # Saru's Fashion Studio

  Saru's Fashion Studio is a single-page React storefront built from a Figma design. It presents the boutique as a premium destination for bridal wear, designer blouses, lehenga stitching, ethnic wear, alterations, and consultation services.

  Original design source: https://www.figma.com/design/vPmVG97cHUT2P9VFLlHtUN/Luxury-Fashion-Boutique-Website

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

  ## Implementation Summary

  This repo was refactored from a monolithic `App.tsx` into modular sections so development is easier for multiple contributors. That makes it simpler to update one area without touching the whole page.
  