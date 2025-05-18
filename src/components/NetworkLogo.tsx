
import { BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NetworkLogo({ size = "md", className }: NetworkLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center gap-2 font-mono", className)}>
      <BrainCircuit className={cn("text-neural-accent animate-pulse-glow", sizeClasses[size])} />
      <span className={cn("font-bold", sizeClasses[size])}>
        The<span className="text-neural-accent">Network</span>
      </span>
    </div>
  );
}
