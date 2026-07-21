import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import saruLogo from "@/imports/saru_fashion.jpg";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
};

export function BrandMark({ size = "md" }: BrandMarkProps) {
  const heights: Record<string, string> = { sm: "h-9", md: "h-11", lg: "h-14" };

  return (
    <ImageWithFallback
      src={saruLogo}
      alt="Saru's Fashion Studio logo"
      className={`${heights[size]} w-auto object-contain rounded-lg`}
    />
  );
}