
import { useState } from "react";
import { CircuitButton } from "./CircuitButton";
import { Send } from "lucide-react";

export function NewPostInput() {
  const [post, setPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.trim()) return;
    
    // In a real app, this would submit the post to the backend
    console.log("Submitting post:", post);
    setPost("");
  };

  return (
    <form onSubmit={handleSubmit} className="neural-card p-4 glow-border mb-6">
      <h3 className="font-mono text-neural-accent mb-2">Create Pulse</h3>
      <div className="circuit-line mb-4"></div>
      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Share your thoughts with the network..."
        className="w-full bg-neural-dark-accent/50 border border-neural-muted rounded-sm p-3 mb-3 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-neural-accent"
      />
      <div className="flex justify-end">
        <CircuitButton type="submit" disabled={!post.trim()}>
          <Send size={16} className="mr-2" /> Send Pulse
        </CircuitButton>
      </div>
    </form>
  );
}
