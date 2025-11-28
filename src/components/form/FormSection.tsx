import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ icon, title, children, className }: FormSectionProps) {
  return (
    <section className={cn("mt-12", className)}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl opacity-80">{icon}</span>
        <h2 className="text-lg font-medium text-foreground tracking-wide">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-2" />
      </div>
      {children}
    </section>
  );
}
