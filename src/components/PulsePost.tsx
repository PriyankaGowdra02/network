
import { cn } from "@/lib/utils";
import { MessageSquare, Heart, Sparkles } from "lucide-react";
import { CircuitButton } from "./CircuitButton";

interface PulsePostProps {
  user: {
    name: string;
    avatar?: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  className?: string;
}

export function PulsePost({
  user,
  content,
  timestamp,
  likes = 0,
  comments = 0,
  className,
}: PulsePostProps) {
  return (
    <div className={cn("neural-card p-4 glow-border", className)}>
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 mr-3 rounded-full bg-neural-accent/20 border border-neural-accent overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-neural-accent">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-neural-muted">@{user.username}</p>
        </div>
        <p className="ml-auto text-xs text-neural-muted">{timestamp}</p>
      </div>
      
      <div className="circuit-line mb-4"></div>
      
      <p className="mb-4 text-foreground/90">{content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-neural-muted hover:text-neural-pulse transition-colors">
            <Heart size={18} />
            <span className="text-xs">{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-neural-muted hover:text-neural-pulse transition-colors">
            <MessageSquare size={18} />
            <span className="text-xs">{comments}</span>
          </button>
        </div>
        <CircuitButton variant="ghost" size="sm" className="text-neural-accent">
          <Sparkles size={16} className="mr-1" />
          <span>Amplify</span>
        </CircuitButton>
      </div>
    </div>
  );
}
