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
    <div className={cn("mt-10", className)}>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}
