
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { NetworkLogo } from "@/components/NetworkLogo";
import { InputField } from "@/components/InputField";
import { CircuitButton } from "@/components/CircuitButton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications'>('profile');
  
  // Profile state
  const [profileForm, setProfileForm] = useState({
    username: "Neural.User",
    email: "user@gmail.com",
    bio: "Network node seeking connections.",
    profileImage: null as File | null
  });
  
  // Privacy state
  const [privacyForm, setPrivacyForm] = useState({
    visibility: "cluster" as "public" | "cluster" | "private",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState({
    connections: true,
    clusterActivity: true,
    directMessages: true,
    emailNotifications: false
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Handle profile form changes
  const handleProfileChange = (field: string, value: string) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
    
    // Basic validation
    if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: "Must be a valid Gmail address" }));
      } else {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    } else if (field === 'username') {
      if (value.length < 3) {
        setErrors(prev => ({ ...prev, username: "Username must be at least 3 characters" }));
      } else {
        setErrors(prev => ({ ...prev, username: "" }));
      }
    }
  };
  
  // Handle password form changes
  const handlePasswordChange = (field: string, value: string) => {
    setPrivacyForm(prev => ({ ...prev, [field]: value }));
    
    // Password validation
    if (field === 'newPassword') {
      if (value.length < 8) {
        setErrors(prev => ({ ...prev, newPassword: "Password must be at least 8 characters" }));
      } else {
        setErrors(prev => ({ ...prev, newPassword: "" }));
      }
      
      if (privacyForm.confirmPassword && value !== privacyForm.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else if (privacyForm.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
    
    if (field === 'confirmPassword') {
      if (value !== privacyForm.newPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileForm(prev => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };
  
  // Save profile changes
  const handleSaveProfile = () => {
    // Validate email
    if (!profileForm.email.endsWith('@gmail.com')) {
      setErrors(prev => ({ ...prev, email: "Must be a valid Gmail address" }));
      return;
    }
    
    // Here you would typically make an API call to update the user's profile
    console.log("Saving profile:", profileForm);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      variant: "default",
    });
  };
  
  // Save security settings
  const handleUpdateSecurity = () => {
    // Validate passwords
    if (privacyForm.newPassword) {
      if (privacyForm.newPassword.length < 8) {
        setErrors(prev => ({ ...prev, newPassword: "Password must be at least 8 characters" }));
        return;
      }
      
      if (privacyForm.newPassword !== privacyForm.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        return;
      }
      
      if (!privacyForm.currentPassword) {
        setErrors(prev => ({ ...prev, currentPassword: "Current password is required" }));
        return;
      }
    }
    
    // Here you would typically make an API call to update the security settings
    console.log("Updating security settings:", privacyForm);
    toast({
      title: "Security Updated",
      description: "Your security settings have been successfully updated.",
      variant: "default",
    });
    
    // Reset password fields
    setPrivacyForm(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };
  
  // Save notification preferences
  const handleSaveNotifications = () => {
    // Here you would typically make an API call to update the notification settings
    console.log("Saving notification preferences:", notificationSettings);
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been successfully updated.",
      variant: "default",
    });
  };
  
  return (
    <MainLayout>
      <CircuitBackground className="min-h-screen p-6">
        <div className="neural-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <NetworkLogo size="md" />
            <h1 className="text-2xl font-mono">Network Settings</h1>
          </div>
          
          <div className="circuit-line mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="neural-card p-4 md:col-span-1">
              <nav className="space-y-1">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'profile' ? 'bg-neural-accent bg-opacity-20 text-neural-accent' : 'text-neural-muted hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Settings
                </button>
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'privacy' ? 'bg-neural-accent bg-opacity-20 text-neural-accent' : 'text-neural-muted hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('privacy')}
                >
                  Privacy & Security
                </button>
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'notifications' ? 'bg-neural-accent bg-opacity-20 text-neural-accent' : 'text-neural-muted hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
              </nav>
            </div>
            
            <div className="neural-card p-6 md:col-span-3">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-mono">Profile Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        label="Username"
                        type="text"
                        placeholder="Your username"
                        value={profileForm.username}
                        onChange={(e) => handleProfileChange('username', e.target.value)}
                        error={errors.username}
                      />
                    </div>
                    <div>
                      <InputField
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        value={profileForm.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        error={errors.email}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
                    <label className="block text-sm font-medium text-foreground/80">Bio</label>
                    <Textarea
                      placeholder="Tell us about yourself"
                      value={profileForm.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full px-4 py-2 bg-neural-dark-accent border border-neural-muted rounded-sm focus:outline-none focus:ring-1 focus:ring-neural-accent placeholder:text-neural-muted/70"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neural-text">Profile Image</label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-neural-accent bg-opacity-20 flex items-center justify-center text-neural-accent overflow-hidden">
                        {profileForm.profileImage ? (
                          <img 
                            src={URL.createObjectURL(profileForm.profileImage)} 
                            alt="Profile Preview" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "NU"
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <CircuitButton type="button" onClick={() => {}}>Upload Image</CircuitButton>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <CircuitButton 
                      onClick={handleSaveProfile}
                      disabled={!!errors.username || !!errors.email}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Save Changes
                    </CircuitButton>
                  </div>
                </div>
              )}
              
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-mono">Privacy & Security</h2>
                  <div>
                    <h3 className="text-neural-text font-medium mb-2">Content Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="public" 
                          name="visibility"
                          value="public"
                          checked={privacyForm.visibility === 'public'} 
                          onChange={() => setPrivacyForm({...privacyForm, visibility: 'public'})}
                          className="mr-2" 
                        />
                        <label htmlFor="public" className="text-neural-muted">Public - Anyone can see your content</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="cluster" 
                          name="visibility" 
                          value="cluster"
                          checked={privacyForm.visibility === 'cluster'}
                          onChange={() => setPrivacyForm({...privacyForm, visibility: 'cluster'})}
                          className="mr-2" 
                        />
                        <label htmlFor="cluster" className="text-neural-muted">Cluster - Only your connections can see your content</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="private" 
                          name="visibility" 
                          value="private"
                          checked={privacyForm.visibility === 'private'}
                          onChange={() => setPrivacyForm({...privacyForm, visibility: 'private'})}
                          className="mr-2" 
                        />
                        <label htmlFor="private" className="text-neural-muted">Private - Only you can see your content</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-neural-text font-medium mb-2">Change Password</h3>
                    <div className="space-y-4">
                      <InputField
                        label="Current Password"
                        type="password"
                        placeholder="Enter your current password"
                        value={privacyForm.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        error={errors.currentPassword}
                      />
                      <InputField
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        value={privacyForm.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        error={errors.newPassword}
                      />
                      <InputField
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={privacyForm.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <CircuitButton 
                      onClick={handleUpdateSecurity}
                      disabled={(privacyForm.newPassword !== '' && (!!errors.currentPassword || !!errors.newPassword || !!errors.confirmPassword))}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Update Security Settings
                    </CircuitButton>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-mono">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-neural-text">Network Connections</h3>
                        <p className="text-sm text-neural-muted">New connections and requests</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={notificationSettings.connections}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            connections: !notificationSettings.connections
                          })}
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neural-accent"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-neural-text">Cluster Activity</h3>
                        <p className="text-sm text-neural-muted">Updates from your clusters</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={notificationSettings.clusterActivity}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            clusterActivity: !notificationSettings.clusterActivity
                          })}
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neural-accent"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-neural-text">Direct Messages</h3>
                        <p className="text-sm text-neural-muted">New message notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={notificationSettings.directMessages}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            directMessages: !notificationSettings.directMessages
                          })}
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neural-accent"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-neural-text">Email Notifications</h3>
                        <p className="text-sm text-neural-muted">Receive important updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={notificationSettings.emailNotifications}
                          onChange={() => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: !notificationSettings.emailNotifications
                          })}
                        />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neural-accent"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <CircuitButton onClick={handleSaveNotifications}>
                      <CheckCircle size={16} className="mr-1" />
                      Save Preferences
                    </CircuitButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CircuitBackground>
    </MainLayout>
  );
};

export default SettingsPage;
