
import { cn } from "@/lib/utils";
import { NeuralWeb } from "./NeuralWeb";

interface CircuitBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function CircuitBackground({ className, children }: CircuitBackgroundProps) {
  return (
    <div className={cn("neural-grid data-stream min-h-screen w-full relative", className)}>
      <NeuralWeb />
      {children}
    </div>
  );
}
