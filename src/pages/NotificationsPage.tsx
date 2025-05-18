
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { NetworkLogo } from "@/components/NetworkLogo";
import { MessageSquare, UserPlus, Bell, CheckCircle, Users } from "lucide-react";
import { CircuitButton } from "@/components/CircuitButton";

interface Notification {
  id: number;
  type: 'connection' | 'message' | 'cluster' | 'mention';
  content: string;
  time: string;
  read: boolean;
  actionable?: boolean;
  from?: {
    name: string;
    username: string;
  };
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'connection',
      content: 'Neural.Dev sent you a connection request',
      time: '2 hours ago',
      read: false,
      actionable: true,
      from: {
        name: 'Neural.Dev',
        username: 'neural_dev'
      }
    },
    {
      id: 2,
      type: 'cluster',
      content: 'You were added to the "Data Streams" cluster',
      time: '1 day ago',
      read: false,
      actionable: false
    },
    {
      id: 3,
      type: 'mention',
      content: 'Circuit.Mind mentioned you in a post',
      time: '3 days ago',
      read: true,
      actionable: false
    },
    {
      id: 4,
      type: 'message',
      content: 'New message from Quantum.Logic',
      time: '4 days ago',
      read: true,
      actionable: false
    },
    {
      id: 5,
      type: 'connection',
      content: 'CyberNode accepted your connection request',
      time: '1 week ago',
      read: true,
      actionable: false
    }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return <UserPlus size={18} className="text-neural-accent" />;
      case 'message':
        return <MessageSquare size={18} className="text-neural-pulse" />;
      case 'cluster':
        return <Users size={18} className="text-neural-glow" />;
      case 'mention':
        return <Bell size={18} className="text-amber-400" />;
      default:
        return <Bell size={18} />;
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleMarkRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleAcceptConnection = (id: number) => {
    // In a real app, you would make an API call to accept the connection
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id 
          ? { 
              ...notification, 
              read: true, 
              actionable: false,
              content: `You are now connected with ${notification.from?.name}`
            } 
          : notification
      )
    );
  };

  const handleDeclineConnection = (id: number) => {
    // In a real app, you would make an API call to decline the connection
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  const unreadCount = notifications.filter(note => !note.read).length;
  
  return (
    <MainLayout>
      <CircuitBackground className="min-h-screen p-6">
        <div className="neural-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <NetworkLogo size="md" />
              <div>
                <h1 className="text-2xl font-mono">Neural Notifications</h1>
                <p className="text-sm text-neural-muted">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <CircuitButton variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
              <CheckCircle size={14} className="mr-2" />
              Mark all as read
            </CircuitButton>
          </div>
          
          <div className="circuit-line mb-6"></div>
          
          <div className="flex mb-4 gap-2">
            <CircuitButton 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('all')}
            >
              All
            </CircuitButton>
            <CircuitButton 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('unread')}
            >
              Unread
            </CircuitButton>
          </div>
          
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`neural-card p-4 border ${notification.read ? 'border-gray-700' : 'border-neural-pulse glow-border-sm'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="mr-3 mt-1">{getIcon(notification.type)}</div>
                      <div>
                        <p className={notification.read ? 'text-neural-muted' : 'text-neural-text'}>
                          {notification.content}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-neural-muted">{notification.time}</span>
                          {!notification.read && (
                            <button 
                              onClick={() => handleMarkRead(notification.id)}
                              className="ml-2 text-xs text-neural-accent hover:underline"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                        
                        {notification.actionable && notification.type === 'connection' && !notification.read && (
                          <div className="flex mt-2 gap-2">
                            <CircuitButton 
                              size="sm" 
                              onClick={() => handleAcceptConnection(notification.id)}
                            >
                              Accept
                            </CircuitButton>
                            <CircuitButton 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeclineConnection(notification.id)}
                            >
                              Decline
                            </CircuitButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell size={32} className="mx-auto mb-2 text-neural-muted" />
                <p className="text-neural-muted">No {filter === 'unread' ? 'unread ' : ''}notifications to display</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center text-neural-muted text-sm">
            <p>Neural pathways are continuously updated in real-time</p>
          </div>
        </div>
      </CircuitBackground>
    </MainLayout>
  );
};

export default NotificationsPage;
