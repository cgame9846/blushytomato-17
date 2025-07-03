
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  MessageCircle, 
  Shield, 
  Palette, 
  Calendar,
  Activity,
  Heart,
  Crown,
  ChevronRight,
  Accessibility,
  Download,
  Upload,
  Lock,
  Eye,
  Volume2
} from 'lucide-react';
import UserProfileInfo from './profile/UserProfileInfo';
import CycleSettings from './profile/CycleSettings';

interface UserSettingsProps {
  onAIPermissionChange: (enabled: boolean) => void;
  aiPermissionEnabled: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ onAIPermissionChange, aiPermissionEnabled }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [userName, setUserName] = useState('Sarah Johnson');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [periodReminders, setPeriodReminders] = useState(true);
  const [showCycleSettings, setShowCycleSettings] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showHealthData, setShowHealthData] = useState(false);
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);

  const handlePremiumClick = () => {
    setShowDialog(false);
    // Navigate to premium page - this would typically use router
    console.log('Navigate to premium page');
  };

  const handleSignOut = () => {
    console.log('Signing out user...');
    // Add sign out logic here
    setShowDialog(false);
  };

  const menuItems = [
    {
      icon: User,
      title: 'Profile',
      subtitle: 'Edit your personal information',
      badge: null,
      onClick: () => {}
    },
    {
      icon: Crown,
      title: 'Premium',
      subtitle: 'Unlock advanced features',
      badge: 'Upgrade',
      onClick: handlePremiumClick
    },
    {
      icon: Calendar,
      title: 'Cycle Settings',
      subtitle: 'Customize your cycle tracking',
      badge: null,
      onClick: () => setShowCycleSettings(true)
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      badge: null,
      onClick: () => {}
    },
    {
      icon: Accessibility,
      title: 'Accessibility',
      subtitle: 'AI Assistant & accessibility options',
      badge: null,
      onClick: () => {}
    },
    {
      icon: Shield,
      title: 'Privacy',
      subtitle: 'Data & security settings',
      badge: null,
      onClick: () => setShowPrivacySettings(true)
    },
    {
      icon: Activity,
      title: 'Health Data',
      subtitle: 'Export and sync options',
      badge: null,
      onClick: () => setShowHealthData(true)
    },
    {
      icon: Settings,
      title: 'General',
      subtitle: 'App preferences',
      badge: null,
      onClick: () => setShowGeneralSettings(true)
    }
  ];

  // Apply dark mode to document body
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 transition-all duration-300 hover:scale-105"
          >
            <User className="h-5 w-5 text-rose-600" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 -m-6 mb-6 p-6 rounded-t-3xl">
            <DialogTitle className="text-xl font-bold text-gray-800">Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* User Profile Info */}
            <UserProfileInfo userName={userName} onNameUpdate={setUserName} />

            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-0 rounded-2xl">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-600">28</div>
                    <div className="text-xs text-gray-600">Cycle Length</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">15</div>
                    <div className="text-xs text-gray-600">Days Tracked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.title === 'Accessibility' ? (
                    <Card className="border-0 bg-white hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
                              <item.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        {/* Accessibility Settings */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MessageCircle className="h-4 w-4 text-blue-500" />
                              <div>
                                <Label className="text-sm font-medium">AI Assistant</Label>
                                <p className="text-xs text-gray-600">Enable AI chat support</p>
                              </div>
                            </div>
                            <Switch
                              checked={aiPermissionEnabled}
                              onCheckedChange={onAIPermissionChange}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4 text-green-500" />
                              <div>
                                <Label className="text-sm font-medium">Period Reminders</Label>
                                <p className="text-xs text-gray-600">Get notified about your cycle</p>
                              </div>
                            </div>
                            <Switch
                              checked={periodReminders}
                              onCheckedChange={setPeriodReminders}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Palette className="h-4 w-4 text-purple-500" />
                              <div>
                                <Label className="text-sm font-medium">Dark Mode</Label>
                                <p className="text-xs text-gray-600">Switch to dark theme</p>
                              </div>
                            </div>
                            <Switch
                              checked={darkMode}
                              onCheckedChange={setDarkMode}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card 
                      className="border-0 bg-white hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer"
                      onClick={item.onClick}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
                              <item.icon className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                {item.title}
                                {item.badge && (
                                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
            
            {/* Sign Out */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full rounded-2xl py-3 text-red-600 border-red-200 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cycle Settings Dialog */}
      <CycleSettings 
        isOpen={showCycleSettings} 
        onClose={() => setShowCycleSettings(false)} 
      />

      {/* Privacy Settings Dialog */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>Privacy & Security</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-blue-500" />
                <div>
                  <Label>Data Encryption</Label>
                  <p className="text-xs text-gray-600">Encrypt sensitive data</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4 text-green-500" />
                <div>
                  <Label>Anonymous Analytics</Label>
                  <p className="text-xs text-gray-600">Help improve the app</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Health Data Dialog */}
      <Dialog open={showHealthData} onOpenChange={setShowHealthData}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>Health Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button className="w-full rounded-2xl flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full rounded-2xl flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* General Settings Dialog */}
      <Dialog open={showGeneralSettings} onOpenChange={setShowGeneralSettings}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>General Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-purple-500" />
                <div>
                  <Label>Sound Effects</Label>
                  <p className="text-xs text-gray-600">Enable app sounds</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-orange-500" />
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-xs text-gray-600">Receive notifications</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSettings;
