type SectionLabelProps = {
  children: string;
  align?: "center" | "left";
};

export function SectionLabel({ children, align = "center" }: SectionLabelProps) {
  const isLeft = align === "left";

  return (
    <div className={`flex items-center gap-3 mb-4 ${isLeft ? "justify-start" : "justify-center"}`}>
      <div className="h-px w-10 bg-[#C8A96A]" />
      <span className="text-[#C8A96A] text-[10px] tracking-[0.25em] uppercase font-semibold">{children}</span>
      <div className="h-px w-10 bg-[#C8A96A]" />
    </div>
  );
}