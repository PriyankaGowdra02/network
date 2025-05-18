
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { NetworkLogo } from "@/components/NetworkLogo";
import { CircuitButton } from "@/components/CircuitButton";
import { User, UserPlus, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NetworkUser {
  id: number;
  name: string;
  username: string;
  focus: string[];
  connected: boolean;
}

const NetworkPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [networkUsers, setNetworkUsers] = useState<NetworkUser[]>([
    { 
      id: 1, 
      name: "Neural.Dev", 
      username: "neural_dev", 
      focus: ["AI", "Machine Learning", "Neural Networks"], 
      connected: true 
    },
    { 
      id: 2, 
      name: "Quantum.Logic", 
      username: "quantum_logic", 
      focus: ["Quantum Computing", "Algorithms"], 
      connected: false 
    },
    { 
      id: 3, 
      name: "Circuit.Mind", 
      username: "circuit_mind", 
      focus: ["Hardware", "IoT", "Embedded Systems"], 
      connected: true 
    },
    { 
      id: 4, 
      name: "DataStream", 
      username: "data_stream", 
      focus: ["Big Data", "Analytics", "Visualization"], 
      connected: false 
    },
    { 
      id: 5, 
      name: "CyberNode", 
      username: "cyber_node", 
      focus: ["Cybersecurity", "Encryption", "Network Security"], 
      connected: false 
    }
  ]);

  const handleConnect = (userId: number) => {
    setNetworkUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, connected: !user.connected } 
          : user
      )
    );
  };

  const filteredUsers = networkUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.focus.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const connectionStats = {
    total: networkUsers.filter(u => u.connected).length,
    pending: 3,
    suggested: 15
  };

  return (
    <MainLayout>
      <CircuitBackground className="min-h-screen p-6">
        <div className="neural-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <NetworkLogo size="md" />
            <h1 className="text-2xl font-mono">Neural Network</h1>
          </div>
          
          <div className="circuit-line mb-6"></div>
          
          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="neural-card p-4 bg-neural-dark-accent/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-neural-accent/20 flex items-center justify-center mr-3">
                <Users size={20} className="text-neural-accent" />
              </div>
              <div>
                <p className="font-mono text-neural-muted text-sm">Connected</p>
                <p className="text-xl font-semibold text-neural-accent">{connectionStats.total}</p>
              </div>
            </div>
            <div className="neural-card p-4 bg-neural-dark-accent/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-neural-pulse/20 flex items-center justify-center mr-3">
                <UserPlus size={20} className="text-neural-pulse" />
              </div>
              <div>
                <p className="font-mono text-neural-muted text-sm">Pending</p>
                <p className="text-xl font-semibold text-neural-pulse">{connectionStats.pending}</p>
              </div>
            </div>
            <div className="neural-card p-4 bg-neural-dark-accent/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-neural-glow/20 flex items-center justify-center mr-3">
                <Users size={20} className="text-neural-glow" />
              </div>
              <div>
                <p className="font-mono text-neural-muted text-sm">Suggested</p>
                <p className="text-xl font-semibold text-neural-glow">{connectionStats.suggested}</p>
              </div>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-6 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neural-muted" />
            <Input
              type="text"
              placeholder="Search by name, username, or focus area"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neural-dark-accent/30 border-neural-grid-line"
            />
          </div>
          
          {/* Network Connections */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono">Network Nodes</h2>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className="neural-card p-4 hover:border-neural-accent transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-neural-accent/20 flex items-center justify-center mr-4">
                        <User size={24} className="text-neural-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-neural-muted text-sm">@{user.username}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.focus.map((tag, index) => (
                            <span key={index} className="text-xs bg-neural-dark-accent px-2 py-0.5 rounded text-neural-muted">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CircuitButton
                      variant={user.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleConnect(user.id)}
                    >
                      {user.connected ? "Connected" : "Connect"}
                    </CircuitButton>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 neural-card p-6">
                <p className="text-neural-muted">No network nodes found matching your search.</p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <CircuitButton>
              <UserPlus size={16} className="mr-2" />
              Discover More Connections
            </CircuitButton>
          </div>
        </div>
      </CircuitBackground>
    </MainLayout>
  );
};

export default NetworkPage;
