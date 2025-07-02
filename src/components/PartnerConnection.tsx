
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Users, Bell, Share, User, Gift, Calendar } from 'lucide-react';

const PartnerConnection = () => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerCode, setPartnerCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [partnerName, setPartnerName] = useState('Alex');
  const [shareSettings, setShareSettings] = useState({
    periodDates: true,
    pmsDays: true,
    moodUpdates: true,
    cravings: true,
    notifications: true,
    symptoms: false
  });

  const handleConnect = () => {
    setIsConnected(true);
  };

  const toggleSetting = (setting: keyof typeof shareSettings) => {
    setShareSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const coupleActivities = [
    {
      id: '1',
      title: 'Synchronized Meditation',
      description: 'Calm your cycles together with guided meditation',
      icon: '🧘‍♀️',
      status: 'new'
    },
    {
      id: '2',
      title: 'Couple Wellness Challenge',
      description: 'Track healthy habits together this month',
      icon: '💪',
      status: 'active'
    },
    {
      id: '3',
      title: 'Cycle Support Reminders',
      description: 'Gentle reminders for your partner to show extra care',
      icon: '💝',
      status: 'completed'
    }
  ];

  const loveMessages = [
    "Your period is coming - extra hugs incoming! 🤗",
    "PMS alert: Chocolate delivery mode activated 🍫",
    "Ovulation window - feeling extra lovely today! ✨",
    "Low energy day - movie night sounds perfect 🎬"
  ];

  const partnerMessages = [
    {
      id: '1',
      content: "Feeling really tired today and craving chocolate 🍫",
      timestamp: new Date(Date.now() - 120000),
      type: 'craving'
    },
    {
      id: '2',
      content: "PMS starting tomorrow - extra cuddles needed! 💕",
      timestamp: new Date(Date.now() - 300000),
      type: 'warning'
    },
    {
      id: '3',
      content: "Feeling emotional today, just need some support 🥺",
      timestamp: new Date(Date.now() - 600000),
      type: 'mood'
    }
  ];

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <Card className="gradient-secondary border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gradient">
              <Heart className="h-5 w-5" />
              Partner Connection
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect with your partner for a synchronized wellness journey
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <span className="text-2xl mb-2 block">💕</span>
                <p className="text-sm font-medium">Better Understanding</p>
                <p className="text-xs text-muted-foreground">Help your partner understand your needs</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <span className="text-2xl mb-2 block">📱</span>
                <p className="text-sm font-medium">Smart Alerts</p>
                <p className="text-xs text-muted-foreground">Automatic notifications for important days</p>
              </div>
            </div>
            
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email Invite</TabsTrigger>
                <TabsTrigger value="code">Partner Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-2">
                <Label htmlFor="partner-email">Partner's Email</Label>
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="partner@email.com"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                />
                <Button 
                  onClick={handleConnect}
                  className="w-full gradient-primary text-white"
                  disabled={!partnerEmail}
                >
                  Send Invitation
                </Button>
              </TabsContent>
              
              <TabsContent value="code" className="space-y-2">
                <Label htmlFor="partner-code">Partner Connection Code</Label>
                <Input
                  id="partner-code"
                  placeholder="Enter your partner's code"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                />
                <Button 
                  onClick={handleConnect}
                  className="w-full gradient-primary text-white"
                  disabled={!partnerCode}
                >
                  Connect Hearts 💕
                </Button>
              </TabsContent>
            </Tabs>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Connection Code:</p>
              <Badge className="bg-primary/10 text-primary text-sm px-3 py-1">
                BT-{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="gradient-secondary border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Heart className="h-5 w-5" />
            Connected with {partnerName}
          </CardTitle>
          <div className="flex items-center justify-between">
            <Badge className="bg-green-100 text-green-700 border-green-300">
              ✓ Hearts Synchronized
            </Badge>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{partnerName}</p>
                <p className="text-xs text-muted-foreground">Partner since 2 weeks ago</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageCircle className="h-4 w-4" />
                Quick Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto py-2 text-xs">
                  🍫 Chocolate craving!
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-2 text-xs">
                  🤗 Need extra cuddles
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-2 text-xs">
                  😭 Feeling emotional
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-2 text-xs">
                  🛁 Bath time needed
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-message">Custom Message</Label>
                <div className="flex gap-2">
                  <Input
                    id="custom-message"
                    placeholder="Tell your partner how you're feeling..."
                    className="flex-1"
                  />
                  <Button size="sm" className="gradient-primary text-white">
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Message History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {partnerMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm">💌</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleDateString()} at {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Couple Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {coupleActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.status === 'new' && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs">New</Badge>
                      )}
                      {activity.status === 'active' && (
                        <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <Button size="sm" className="gradient-primary text-white">
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4" />
                Smart Love Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loveMessages.map((message, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-lg">💌</span>
                  <p className="text-sm flex-1">{message}</p>
                  <Button size="sm" variant="outline">Send</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Share className="h-4 w-4" />
                Sharing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(shareSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Button
                    id={key}
                    variant={value ? "default" : "outline"}
                    size="sm"
                    className={value ? "gradient-primary text-white" : ""}
                    onClick={() => toggleSetting(key as keyof typeof shareSettings)}
                  >
                    {value ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerConnection;
