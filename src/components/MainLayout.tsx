
import { cn } from "@/lib/utils";
import { CircuitBackground } from "./CircuitBackground";
import { NetworkSidebar } from "./NetworkSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-neural-dark">
      <NetworkSidebar />
      <main className="flex-1 overflow-auto">
        <CircuitBackground className={cn("p-6", className)}>
          {children}
        </CircuitBackground>
      </main>
    </div>
  );
}
