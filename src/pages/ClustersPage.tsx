
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { NetworkLogo } from "@/components/NetworkLogo";
import { CircuitButton } from "@/components/CircuitButton";
import { Users, Plus, Brain, Cpu, Database, Network, Lock, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Cluster {
  id: number;
  name: string;
  members: number;
  topic: string;
  description: string;
  privacy: "public" | "private";
  joined: boolean;
}

const ClustersPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCluster, setNewCluster] = useState({
    name: "",
    topic: "",
    description: "",
    privacy: "public" as "public" | "private"
  });
  
  const [clusters, setClusters] = useState<Cluster[]>([
    { 
      id: 1, 
      name: "Neural Engineers", 
      members: 1245, 
      topic: "AI & Machine Learning", 
      description: "A community focused on advancing neural network architectures and applications.",
      privacy: "public",
      joined: false 
    },
    { 
      id: 2, 
      name: "Data Streams", 
      members: 879, 
      topic: "Data Science", 
      description: "Exploring big data processing techniques and visualization methods.",
      privacy: "public",
      joined: false
    },
    { 
      id: 3, 
      name: "Circuit Connect", 
      members: 642, 
      topic: "Hardware & Electronics", 
      description: "Hardware enthusiasts building the next generation of electronic devices.",
      privacy: "private",
      joined: false
    },
    { 
      id: 4, 
      name: "Quantum Minds", 
      members: 421, 
      topic: "Quantum Computing", 
      description: "Exploring the frontiers of quantum algorithms and computation.",
      privacy: "public",
      joined: false
    },
    { 
      id: 5, 
      name: "Secure Nodes", 
      members: 563, 
      topic: "Cybersecurity", 
      description: "Dedicated to network security and privacy enhancement technologies.",
      privacy: "private",
      joined: false
    }
  ]);

  const [userClusters, setUserClusters] = useState<Cluster[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'joined'>('all');

  const handleCreateCluster = () => {
    if (newCluster.name && newCluster.topic && newCluster.description) {
      const createdCluster: Cluster = {
        id: Date.now(),
        name: newCluster.name,
        topic: newCluster.topic,
        description: newCluster.description,
        members: 1, // Just you initially
        privacy: newCluster.privacy,
        joined: true
      };
      
      setClusters(prev => [...prev, createdCluster]);
      setUserClusters(prev => [...prev, createdCluster]);
      
      // Reset form
      setNewCluster({ name: "", topic: "", description: "", privacy: "public" });
      setShowCreateForm(false);
    }
  };

  const handleJoinCluster = (clusterId: number) => {
    setClusters(prevClusters => 
      prevClusters.map(cluster => 
        cluster.id === clusterId
          ? { ...cluster, joined: !cluster.joined, members: cluster.joined ? cluster.members - 1 : cluster.members + 1 }
          : cluster
      )
    );

    const targetCluster = clusters.find(c => c.id === clusterId);
    if (targetCluster) {
      if (targetCluster.joined) {
        // Leave cluster
        setUserClusters(prev => prev.filter(c => c.id !== clusterId));
      } else {
        // Join cluster
        setUserClusters(prev => [...prev, {...targetCluster, joined: true}]);
      }
    }
  };

  const getClusterIcon = (topic: string) => {
    switch (topic.toLowerCase()) {
      case "ai & machine learning":
        return <Brain />;
      case "hardware & electronics":
        return <Cpu />;
      case "data science":
        return <Database />;
      case "quantum computing":
        return <Network />;
      case "cybersecurity":
        return <Lock />;
      default:
        return <Globe />;
    }
  };

  return (
    <MainLayout>
      <CircuitBackground className="min-h-screen p-6">
        <div className="neural-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <NetworkLogo size="md" />
            <h1 className="text-2xl font-mono">Network Clusters</h1>
          </div>
          
          <div className="circuit-line mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="neural-card p-6 glow-border">
              <h2 className="text-xl font-mono mb-4">Your Clusters</h2>
              
              {userClusters.length > 0 ? (
                <div className="space-y-3">
                  {userClusters.map(cluster => (
                    <div key={cluster.id} className="bg-neural-dark-accent/30 p-3 rounded flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-neural-accent/20 flex items-center justify-center mr-3 text-neural-accent">
                          {getClusterIcon(cluster.topic)}
                        </div>
                        <div>
                          <p className="font-semibold">{cluster.name}</p>
                          <p className="text-xs text-neural-muted">{cluster.members} members</p>
                        </div>
                      </div>
                      <CircuitButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleJoinCluster(cluster.id)}
                      >
                        Leave
                      </CircuitButton>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neural-muted mb-6">You haven't joined any clusters yet.</p>
              )}
              
              <div className="flex justify-between mt-4">
                <CircuitButton 
                  onClick={() => setActiveTab('all')}
                  variant={activeTab === 'all' ? 'default' : 'outline'}
                >
                  <Users size={16} className="mr-2" />
                  Explore Clusters
                </CircuitButton>
                
                <CircuitButton 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  variant={showCreateForm ? 'default' : 'outline'}
                >
                  <Plus size={16} className="mr-2" />
                  Create New Cluster
                </CircuitButton>
              </div>
            </div>
            
            <div className="neural-card p-6 glow-border">
              {showCreateForm ? (
                <div>
                  <h2 className="text-xl font-mono mb-4">Create Cluster</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neural-muted mb-1">Cluster Name</label>
                      <Input 
                        value={newCluster.name}
                        onChange={(e) => setNewCluster({...newCluster, name: e.target.value})}
                        placeholder="Enter cluster name"
                        className="bg-neural-dark-accent/30 border-neural-grid-line"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neural-muted mb-1">Topic/Focus</label>
                      <Input 
                        value={newCluster.topic}
                        onChange={(e) => setNewCluster({...newCluster, topic: e.target.value})}
                        placeholder="Main focus area (e.g., AI, Data Science)"
                        className="bg-neural-dark-accent/30 border-neural-grid-line"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neural-muted mb-1">Description</label>
                      <Textarea 
                        value={newCluster.description}
                        onChange={(e) => setNewCluster({...newCluster, description: e.target.value})}
                        placeholder="Describe your cluster's purpose"
                        className="bg-neural-dark-accent/30 border-neural-grid-line"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neural-muted mb-1">Privacy</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            checked={newCluster.privacy === 'public'}
                            onChange={() => setNewCluster({...newCluster, privacy: 'public'})}
                            className="mr-2"
                          />
                          <span>Public</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            checked={newCluster.privacy === 'private'}
                            onChange={() => setNewCluster({...newCluster, privacy: 'private'})}
                            className="mr-2"
                          />
                          <span>Private</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <CircuitButton onClick={handleCreateCluster} disabled={!newCluster.name || !newCluster.topic || !newCluster.description}>
                        Create Cluster
                      </CircuitButton>
                      <CircuitButton variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </CircuitButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-mono mb-4">Featured Cluster</h2>
                  <div className="bg-neural-accent/10 p-4 rounded-lg border border-neural-accent/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-neural-accent/20 flex items-center justify-center text-neural-accent">
                        <Brain size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neural-accent">Neural Engineers</h3>
                        <p className="text-xs text-neural-muted">1,245 members • AI & Machine Learning</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">
                      The premier cluster for AI engineers and researchers exploring neural networks, deep learning models, and cognitive computing architectures.
                    </p>
                    <div className="text-xs text-neural-muted mb-3">Recent topics:</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-neural-dark-accent px-2 py-1 rounded">Transformer Models</span>
                      <span className="text-xs bg-neural-dark-accent px-2 py-1 rounded">Edge AI</span>
                      <span className="text-xs bg-neural-dark-accent px-2 py-1 rounded">Unsupervised Learning</span>
                    </div>
                    <CircuitButton size="sm">Join Featured Cluster</CircuitButton>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-mono mb-4">Popular Clusters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clusters.map(cluster => (
              <div key={cluster.id} className="neural-card p-4 hover:border-neural-pulse transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-neural-dark-accent/50 flex items-center justify-center mr-2 text-neural-accent">
                    {getClusterIcon(cluster.topic)}
                  </div>
                  <h3 className="text-neural-accent font-mono">{cluster.name}</h3>
                </div>
                <p className="text-neural-muted text-sm">{cluster.topic}</p>
                <p className="text-xs text-neural-muted mt-1 line-clamp-2">{cluster.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-neural-muted">
                    {cluster.members} members • {cluster.privacy === 'public' ? (
                      <span className="flex items-center"><Globe size={10} className="mr-1" /> Public</span>
                    ) : (
                      <span className="flex items-center"><Lock size={10} className="mr-1" /> Private</span>
                    )}
                  </div>
                  <CircuitButton 
                    size="sm" 
                    variant={cluster.joined ? "outline" : "default"}
                    onClick={() => handleJoinCluster(cluster.id)}
                  >
                    {cluster.joined ? "Leave" : "Join"}
                  </CircuitButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CircuitBackground>
    </MainLayout>
  );
};

export default ClustersPage;
