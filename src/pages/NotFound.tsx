
import { Link } from "react-router-dom";
import { CircuitBackground } from "@/components/CircuitBackground";
import { CircuitButton } from "@/components/CircuitButton";
import { NetworkLogo } from "@/components/NetworkLogo";

const NotFound = () => {
  return (
    <CircuitBackground className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="neural-card p-8 max-w-md text-center glow-border">
        <NetworkLogo size="lg" className="justify-center mb-6" />
        
        <h1 className="text-4xl font-mono font-bold mb-2 text-neural-glow">404</h1>
        <h2 className="text-2xl font-mono mb-6">Connection Lost</h2>
        
        <div className="circuit-line mb-6"></div>
        
        <p className="mb-8 text-neural-muted">
          The neural pathway you're looking for doesn't exist or has been disconnected.
        </p>
        
        <Link to="/">
          <CircuitButton>
            Return to The Network
          </CircuitButton>
        </Link>
      </div>
    </CircuitBackground>
  );
};

export default NotFound;
