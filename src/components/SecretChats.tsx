
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Heart, Send } from 'lucide-react';

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  emoji: string;
  isActive: boolean;
}

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  emoji: string;
}

const SecretChats = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const chatRooms: ChatRoom[] = [
    {
      id: 'pms-support',
      name: 'PMS Warriors',
      description: 'Support group for PMS struggles',
      memberCount: 247,
      emoji: '💪',
      isActive: true
    },
    {
      id: 'period-positive',
      name: 'Period Positivity',
      description: 'Celebrating our cycles',
      memberCount: 189,
      emoji: '🌸',
      isActive: true
    },
    {
      id: 'ttc-support',
      name: 'TTC Journey',
      description: 'Trying to conceive support',
      memberCount: 156,
      emoji: '🤱',
      isActive: true
    },
    {
      id: 'endo-warriors',
      name: 'Endo Warriors',
      description: 'Endometriosis support community',
      memberCount: 98,
      emoji: '🦋',
      isActive: true
    },
    {
      id: 'teen-talk',
      name: 'Teen Talk',
      description: 'Safe space for young menstruators',
      memberCount: 134,
      emoji: '💫',
      isActive: true
    },
    {
      id: 'partner-chat',
      name: 'Partner Support',
      description: 'Help understanding your cycle',
      memberCount: 67,
      emoji: '💕',
      isActive: true
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      username: 'FlowerPower23',
      content: "Anyone else dealing with really bad cramps today? 😭",
      timestamp: new Date(Date.now() - 300000),
      emoji: '🌺'
    },
    {
      id: '2',
      username: 'MoonCycle89',
      content: "Heating pad and chocolate are my best friends right now! 🍫",
      timestamp: new Date(Date.now() - 240000),
      emoji: '🌙'
    },
    {
      id: '3',
      username: 'WarriorQueen',
      content: "Try magnesium supplements! They've been a game changer for me 💊",
      timestamp: new Date(Date.now() - 180000),
      emoji: '👑'
    },
    {
      id: '4',
      username: 'GentleSpirit',
      content: "Sending hugs to everyone having a tough day 🤗💕",
      timestamp: new Date(Date.now() - 120000),
      emoji: '🕊️'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log('Sending message:', {
      room: selectedRoom,
      message: newMessage,
      timestamp: new Date()
    });
    
    setNewMessage('');
    // In real app, this would send to Supabase real-time
  };

  const handleJoinRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    console.log('Joining room:', roomId);
  };

  if (selectedRoom) {
    const room = chatRooms.find(r => r.id === selectedRoom);
    
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{room?.emoji}</span>
                <div>
                  <CardTitle className="text-lg text-gradient">{room?.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {room?.memberCount} members • Anonymous chat
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedRoom(null)}
              >
                Leave
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{message.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-primary">
                        {message.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Share your thoughts anonymously..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
                className="gradient-primary text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
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
            <Users className="h-5 w-5" />
            Secret Chats
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Anonymous, supportive communities for every journey 💕
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-green-100 text-green-700 border-green-300">
              🔒 100% Anonymous
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              🛡️ Safe Space
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect with others who understand your experience. All chats are anonymous 
            and moderated for safety. Your privacy is our priority.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {chatRooms.map((room) => (
          <Card 
            key={room.id} 
            className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-primary/30"
            onClick={() => handleJoinRoom(room.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{room.emoji}</span>
                  <div>
                    <h3 className="font-medium text-gradient">{room.name}</h3>
                    <p className="text-sm text-muted-foreground">{room.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {room.memberCount} members
                      </span>
                      {room.isActive && (
                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-medium text-amber-800">Community Guidelines</p>
          </div>
          <ul className="text-xs text-amber-700 space-y-1">
            <li>• Be kind and supportive to everyone</li>
            <li>• Respect privacy - no personal information</li>
            <li>• No medical advice - always consult professionals</li>
            <li>• Report inappropriate behavior</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretChats;
