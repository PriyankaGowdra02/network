
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { NetworkLogo } from "@/components/NetworkLogo";
import { Input } from "@/components/ui/input";
import { CircuitButton } from "@/components/CircuitButton";
import { Send, User, PlusCircle } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      sender: "Neural.Dev", 
      text: "Hello! How's your neural network project coming along?", 
      timestamp: "10:30 AM", 
      isCurrentUser: false 
    },
    { 
      id: 2, 
      sender: "You", 
      text: "Making progress! Just implemented a new synapse pattern.", 
      timestamp: "10:35 AM", 
      isCurrentUser: true 
    },
  ]);
  
  const contacts = [
    { id: 1, name: "Neural.Dev", status: "online" },
    { id: 2, name: "Circuit.Mind", status: "offline" },
    { id: 3, name: "Quantum.Logic", status: "away" }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        sender: "You",
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessageText("");
      
      // Simulate response after delay
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          sender: selectedContact || "Neural.Dev",
          text: "Interesting! Tell me more about your neural pathways.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <MainLayout>
      <CircuitBackground className="min-h-screen p-6">
        <div className="neural-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <NetworkLogo size="md" />
            <h1 className="text-2xl font-mono">Neural Messaging</h1>
          </div>
          
          <div className="circuit-line mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neural-card p-4 glow-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mono">Connections</h2>
                <button className="text-neural-accent hover:text-neural-pulse">
                  <PlusCircle size={18} />
                </button>
              </div>
              
              {contacts.length > 0 ? (
                <div className="space-y-2">
                  {contacts.map(contact => (
                    <div 
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.name)}
                      className={`p-2 rounded cursor-pointer flex items-center ${selectedContact === contact.name ? 'bg-neural-accent/20 border-l-2 border-neural-accent' : 'hover:bg-neural-dark-accent/30'}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-neural-dark-accent flex items-center justify-center mr-3">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <div className="flex items-center text-xs">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${contact.status === 'online' ? 'bg-green-400' : contact.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'}`}></span>
                          <span className="text-neural-muted capitalize">{contact.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-neural-muted">Your neural pathways are currently empty.</p>
                  <p className="text-neural-muted mt-2">Start connecting with other nodes in the network.</p>
                </>
              )}
            </div>
            
            <div className="neural-card p-4 col-span-2 glow-border flex flex-col">
              {selectedContact || messages.length > 0 ? (
                <>
                  <div className="bg-neural-dark-accent/30 p-3 rounded-t flex items-center gap-3 border-b border-neural-grid-line">
                    <div className="w-8 h-8 rounded-full bg-neural-dark-accent flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedContact || "Neural.Dev"}</p>
                      <p className="text-xs text-neural-muted">Active now</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 min-h-[250px] max-h-[350px] space-y-3">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] p-3 rounded-lg ${message.isCurrentUser ? 'bg-neural-accent/30 text-white' : 'bg-neural-dark-accent/50'}`}>
                          <p>{message.text}</p>
                          <p className="text-xs text-neural-muted text-right mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t border-neural-grid-line mt-auto">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }} className="flex gap-2">
                      <Input 
                        value={messageText} 
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..." 
                        className="flex-1 bg-neural-dark-accent/30 border-neural-grid-line"
                      />
                      <CircuitButton type="submit" disabled={!messageText.trim()}>
                        <Send size={16} />
                      </CircuitButton>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="neural-icon mb-4 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-neural-accent">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <p className="text-neural-muted">Select a connection to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-neural-muted text-sm">
            <p>End-to-end encrypted messaging with real-time neural pathways</p>
          </div>
        </div>
      </CircuitBackground>
    </MainLayout>
  );
};

export default MessagesPage;
