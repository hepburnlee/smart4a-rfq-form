import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  title: string;
  description: string;
  price?: string;
  priceLabel?: string;
  selected: boolean;
  onSelect: () => void;
  hasExpandableContent?: boolean;
  children?: React.ReactNode;
}

export function OptionCard({
  title,
  description,
  price,
  priceLabel,
  selected,
  onSelect,
  hasExpandableContent,
  children,
}: OptionCardProps) {
  return (
    <div className="mb-4">
      <div
        onClick={onSelect}
        className={cn(
          "relative flex gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
          "hover:border-primary hover:-translate-y-0.5 hover:shadow-lg",
          selected
            ? "border-primary bg-accent shadow-lg"
            : "border-border bg-card"
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            selected
              ? "border-primary bg-primary"
              : "border-muted-foreground/40 bg-transparent"
          )}
        >
          {selected && <Check className="w-4 h-4 text-primary-foreground" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="font-bold text-lg text-foreground">{title}</span>
            {price && (
              <span className="font-bold text-primary text-lg">{price}</span>
            )}
            {priceLabel && (
              <span className="text-muted-foreground">{priceLabel}</span>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {hasExpandableContent && selected && children && (
        <div className="border-2 border-primary border-t-0 rounded-b-xl p-6 bg-card animate-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}
