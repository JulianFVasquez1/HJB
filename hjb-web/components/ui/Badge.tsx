import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "gold";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "glass", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors uppercase tracking-wider",
          {
            "bg-primary text-white": variant === "default",
            "glass text-white border-white/20": variant === "glass",
            "border border-white/20 text-foreground": variant === "outline",
            "bg-secondary/20 text-secondary-light border border-secondary/30": variant === "gold",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
