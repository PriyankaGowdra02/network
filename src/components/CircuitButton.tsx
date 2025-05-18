
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface CircuitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
  asChild?: boolean;
}

const CircuitButton = forwardRef<HTMLButtonElement, CircuitButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Map "default" variant to "primary" for backward compatibility
    const mappedVariant = variant === "default" ? "primary" : variant;

    const variantStyles = {
      primary: "bg-neural-accent text-white border-neural-accent hover:bg-opacity-80",
      secondary: "bg-neural-pulse text-neural-dark border-neural-pulse hover:bg-opacity-80",
      accent: "bg-neural-glow text-white border-neural-glow hover:bg-opacity-80",
      ghost: "bg-transparent hover:bg-neural-muted hover:bg-opacity-20",
      outline: "bg-transparent border border-neural-accent text-neural-accent hover:bg-neural-accent hover:bg-opacity-10",
      default: "bg-neural-accent text-white border-neural-accent hover:bg-opacity-80", // same as primary
    };

    const sizeStyles = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    };

    return (
      <Comp
        className={cn(
          "relative font-mono rounded-sm border cursor-pointer transition-all",
          "after:absolute after:inset-0 after:rounded-sm",
          "after:shadow-[0_0_10px_theme(colors.neural.accent)] after:opacity-0",
          "hover:after:opacity-100 active:scale-95",
          variantStyles[mappedVariant as keyof typeof variantStyles],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CircuitButton.displayName = "CircuitButton";

export { CircuitButton };
