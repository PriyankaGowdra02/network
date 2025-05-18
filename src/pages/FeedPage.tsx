
import { MainLayout } from "@/components/MainLayout";
import { NewPostInput } from "@/components/NewPostInput";
import { PulsePost } from "@/components/PulsePost";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Alex Chen",
      username: "neuralcoder",
    },
    content: "Just deployed a new neural network visualization tool. Check it out at neuralviz.io #AITools #DataViz",
    timestamp: "2h ago",
    likes: 42,
    comments: 7,
  },
  {
    id: 2,
    user: {
      name: "Maya Johnson",
      username: "datasynapse",
    },
    content: "Working on a collaborative project to map global internet traffic as neural pathways. Looking for data scientists and frontend devs to join! #Collaboration #NetworkData",
    timestamp: "4h ago",
    likes: 28,
    comments: 12,
  },
  {
    id: 3,
    user: {
      name: "Thomas Wright",
      username: "quantumloop",
    },
    content: "The intersection of quantum computing and neural networks opens up fascinating possibilities for processing complex data structures. Who else is exploring this space?",
    timestamp: "8h ago",
    likes: 56,
    comments: 15,
  },
];

const FeedPage = () => {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-mono font-bold mb-6">Your Neural Feed</h1>
        
        <NewPostInput />
        
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

export default FeedPage;
