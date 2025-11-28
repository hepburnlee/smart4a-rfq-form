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
    <div>
      <div
        onClick={onSelect}
        className={cn(
          "relative flex gap-4 p-6 rounded-xl border cursor-pointer transition-all duration-300",
          "hover:border-primary/50 hover:shadow-md",
          selected
            ? "border-primary/60 bg-accent/50 shadow-sm"
            : "border-border bg-card hover:bg-accent/20"
        )}
      >
        {/* Custom checkbox with Japanese minimalist style */}
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5",
            selected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 bg-transparent"
          )}
        >
          {selected && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-medium text-foreground">{title}</span>
            {price && (
              <span className="font-medium text-primary tabular-nums">{price}</span>
            )}
            {priceLabel && (
              <span className="text-sm text-muted-foreground">{priceLabel}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Expandable content with smooth animation */}
      {hasExpandableContent && selected && children && (
        <div className="border border-t-0 border-primary/40 rounded-b-xl p-6 bg-accent/30 -mt-3 pt-8 animate-in fade-in slide-in-from-top-1 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}
