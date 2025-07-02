import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Heart, MessageCircle, Users, Gift, Calendar } from 'lucide-react';

const CoupleConnection = () => {
  const [partnerCode, setPartnerCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [partnerName, setPartnerName] = useState('Alex');

  const handleConnect = () => {
    setIsConnected(true);
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

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <Card className="gradient-secondary border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gradient">
              <Heart className="h-5 w-5" />
              Couple Connection
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect with your partner for a synchronized wellness journey
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <span className="text-2xl mb-2 block">💕</span>
                <p className="text-sm font-medium">Sync Together</p>
                <p className="text-xs text-muted-foreground">Share wellness goals and activities</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <span className="text-2xl mb-2 block">📱</span>
                <p className="text-sm font-medium">Smart Reminders</p>
                <p className="text-xs text-muted-foreground">Caring notifications for both of you</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="partner-code">Partner Connection Code</Label>
              <Input
                id="partner-code"
                placeholder="Enter your partner's code"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleConnect}
              className="w-full gradient-primary text-white"
              disabled={!partnerCode}
            >
              Connect Hearts 💕
            </Button>
            
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
          <Badge className="bg-green-100 text-green-700 border-green-300 w-fit">
            ✓ Hearts Synchronized
          </Badge>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="h-4 w-4" />
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
    </div>
  );
};

export default CoupleConnection;
