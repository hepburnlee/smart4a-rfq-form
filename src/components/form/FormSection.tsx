import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ icon: Icon, title, children, className }: FormSectionProps) {
  return (
    <section className={cn("mt-16", className)}>
      <div className="flex items-center gap-3 mb-8">
        <Icon className="w-5 h-5 text-primary/70" strokeWidth={1.5} />
        <h2 className="text-lg font-medium text-foreground tracking-wide">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-2" />
      </div>
      {children}
    </section>
  );
}
