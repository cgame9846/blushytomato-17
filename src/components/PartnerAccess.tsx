
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Heart, Users, MessageCircle, Bell, Share, User } from 'lucide-react';

const PartnerAccess = () => {
  const [partnerEmail, setPartnerEmail] = useState('');
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
    console.log('Connecting partner:', partnerEmail);
    setIsConnected(true);
    // In real app, this would send invitation via Supabase
  };

  const toggleSetting = (setting: keyof typeof shareSettings) => {
    setShareSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

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
              Share your cycle journey with your partner for better support
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
            
            <div className="space-y-2">
              <Label htmlFor="partner-email">Partner's Email</Label>
              <Input
                id="partner-email"
                type="email"
                placeholder="partner@email.com"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleConnect}
              className="w-full gradient-primary text-white"
              disabled={!partnerEmail}
            >
              Send Invitation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">What Your Partner Will See</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">📅</span>
              <div>
                <p className="text-sm font-medium">Period Schedule</p>
                <p className="text-xs text-muted-foreground">Upcoming and current period dates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-medium">PMS Warning Days</p>
                <p className="text-xs text-muted-foreground">"Danger Days - Proceed with Chocolate" alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💬</span>
              <div>
                <p className="text-sm font-medium">Your Messages</p>
                <p className="text-xs text-muted-foreground">Cravings, feelings, and support requests</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🔔</span>
              <div>
                <p className="text-sm font-medium">Smart Notifications</p>
                <p className="text-xs text-muted-foreground">Gentle reminders for important days</p>
              </div>
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
          <Badge className="bg-green-100 text-green-700 border-green-300 w-fit">
            ✓ Active Connection
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium">{partnerName}</p>
                <p className="text-sm text-muted-foreground">Partner since 2 weeks ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default PartnerAccess;
