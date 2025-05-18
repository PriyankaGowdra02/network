
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NetworkLogo } from "@/components/NetworkLogo";
import { CircuitButton } from "@/components/CircuitButton";
import { CircuitBackground } from "@/components/CircuitBackground";
import { BrainCircuit, Network, MessageSquare, Users } from "lucide-react";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Network size={40} className="text-neural-accent" />,
      title: "Neural Profiles",
      description:
        "Create immersive profiles with wireframe avatars and a Synapse Map visualizing your network connections.",
    },
    {
      icon: <MessageSquare size={40} className="text-neural-pulse" />,
      title: "Pulse Posts",
      description:
        "Share content with neural filters, enabling dynamic, data-rich conversations throughout the network.",
    },
    {
      icon: <Users size={40} className="text-neural-glow" />,
      title: "Network Clusters",
      description:
        "Join themed communities with dedicated feeds and real-time collaboration tools.",
    },
  ];

  return (
    <CircuitBackground>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="py-4 px-6 flex justify-between items-center">
          <NetworkLogo />
          <div className="space-x-4">
            <Link to="/login">
              <CircuitButton variant="ghost">Login</CircuitButton>
            </Link>
            <Link to="/register">
              <CircuitButton>Join Now</CircuitButton>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-5xl mx-auto">
          <div className="mb-8 animate-pulse-glow">
            <BrainCircuit size={80} className="text-neural-accent mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
            The <span className="text-neural-accent">Network</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-2xl">
            A neural circuit-inspired platform where users connect, share, and collaborate in an immersive digital ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <CircuitButton size="lg">Join The Network</CircuitButton>
            </Link>
            <Link to="/login">
              <CircuitButton variant="ghost" size="lg">Login</CircuitButton>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-mono font-bold text-center mb-12">
            Experience The <span className="text-neural-accent">Neural Web</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`neural-card p-6 transition-all duration-500 transform ${
                  index === activeSection ? "scale-105 glow-border" : ""
                }`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-mono font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-neural-muted text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 text-center text-neural-muted">
          <p>&copy; {new Date().getFullYear()} The Network. A neural-circuit interface to the digital world.</p>
        </footer>
      </div>
    </CircuitBackground>
  );
};

export default LandingPage;
