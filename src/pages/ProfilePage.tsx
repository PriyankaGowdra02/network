
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitButton } from "@/components/CircuitButton";
import { PulsePost } from "@/components/PulsePost";
import { Network, Users, MessageSquare, Settings, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const mockUser = {
  name: "Alex Morgan",
  username: "neural_explorer",
  bio: "Exploring the intersections of technology, neuroscience, and digital networks. Building neural interfaces for the future.",
  connections: 287,
  clusters: 12,
  pulses: 145,
};

const mockPosts = [
  {
    id: 1,
    user: {
      name: mockUser.name,
      username: mockUser.username,
    },
    content: "Experimenting with a new neural visualization algorithm. The results are promising - we're seeing patterns in network data that were previously invisible.",
    timestamp: "3h ago",
    likes: 31,
    comments: 8,
  },
  {
    id: 2,
    user: {
      name: mockUser.name,
      username: mockUser.username,
    },
    content: "Just joined the Quantum Computing cluster. Excited to collaborate with others at the frontier of computational theory! #QuantumNetworks #Collaboration",
    timestamp: "2d ago",
    likes: 45,
    comments: 12,
  },
];

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...mockUser});

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the user data
    // For now, we'll just update the mockUser object
    Object.assign(mockUser, editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser({...mockUser});
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="neural-card p-6 mb-6 glow-border">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-full bg-neural-accent/20 border-2 border-neural-accent flex items-center justify-center pulse-effect">
              <span className="text-4xl text-neural-accent font-bold">{mockUser.name.charAt(0)}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  {isEditing ? (
                    <Input 
                      className="text-2xl font-bold bg-neural-dark-accent border-neural-accent mb-2"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  )}
                  {isEditing ? (
                    <div className="flex items-center">
                      <span className="text-neural-muted mr-1">@</span>
                      <Input 
                        className="text-neural-muted bg-neural-dark-accent border-neural-accent"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
                      />
                    </div>
                  ) : (
                    <p className="text-neural-muted">@{mockUser.username}</p>
                  )}
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <CircuitButton variant="outline" onClick={handleCancelEdit}>
                      <X size={16} className="mr-1" />
                      Cancel
                    </CircuitButton>
                    <CircuitButton onClick={handleSaveProfile}>
                      <Save size={16} className="mr-1" />
                      Save
                    </CircuitButton>
                  </div>
                ) : (
                  <CircuitButton variant="ghost" onClick={() => setIsEditing(true)}>
                    <Settings size={16} className="mr-1" />
                    Edit Profile
                  </CircuitButton>
                )}
              </div>
              
              {isEditing ? (
                <Textarea 
                  className="my-4 bg-neural-dark-accent border-neural-accent"
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                />
              ) : (
                <p className="my-4">{mockUser.bio}</p>
              )}
              
              <div className="circuit-line my-4"></div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Network size={18} className="text-neural-accent mr-2" />
                  <span className="font-bold text-neural-accent">{mockUser.connections}</span>
                  <span className="ml-1 text-sm text-neural-muted">Connections</span>
                </div>
                <div className="flex items-center">
                  <Users size={18} className="text-neural-pulse mr-2" />
                  <span className="font-bold text-neural-pulse">{mockUser.clusters}</span>
                  <span className="ml-1 text-sm text-neural-muted">Clusters</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={18} className="text-neural-glow mr-2" />
                  <span className="font-bold text-neural-glow">{mockUser.pulses}</span>
                  <span className="ml-1 text-sm text-neural-muted">Pulses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Network Visualization Placeholder */}
        <div className="neural-card p-6 mb-6 text-center">
          <h2 className="text-xl font-mono font-semibold text-neural-accent mb-3">
            Neural Network Visualization
          </h2>
          <div className="circuit-line mb-4"></div>
          <div className="bg-neural-dark-accent/30 h-48 rounded-md border border-neural-grid-line flex items-center justify-center">
            <p className="text-neural-muted">
              Your network visualization would appear here.
            </p>
          </div>
          <CircuitButton variant="ghost" size="sm" className="mt-4">
            <Network size={16} className="mr-2" />
            Explore Network
          </CircuitButton>
        </div>
        
        {/* User Posts */}
        <h2 className="text-xl font-mono font-semibold mb-4">Recent Pulses</h2>
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PulsePost
              key={post.id}
              user={post.user}
              content={post.content}
              timestamp={post.timestamp}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
