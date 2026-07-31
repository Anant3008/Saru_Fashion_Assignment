import type { HTMLAttributes } from "react";

type SectionLabelProps = HTMLAttributes<HTMLDivElement> & {
  children: string;
  align?: "center" | "left";
};

export function SectionLabel({ children, align = "center", className = "", ...props }: SectionLabelProps) {
  const isLeft = align === "left";

  return (
    <div
      className={`flex items-center gap-3 mb-4 ${isLeft ? "justify-start" : "justify-center"} ${className}`}
      {...props}
    >
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#E2B49A]" />
      <span className="text-[#E2B49A] text-[11px] tracking-[0.28em] uppercase font-bold">
        {children}
      </span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#E2B49A]" />
    </div>
  );
}
