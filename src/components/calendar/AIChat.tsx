
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Heart } from 'lucide-react';
import { Message } from './CalendarTypes';

interface AIChatProps {
  aiPermissionEnabled: boolean;
  showAIChatDialog: boolean;
  onToggleChat: () => void;
}

const AIChat: React.FC<AIChatProps> = ({
  aiPermissionEnabled,
  showAIChatDialog,
  onToggleChat
}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello beautiful! 💕 I'm your caring wellness companion, here to support you through every moment of your health journey. Think of me as your wise, loving friend who's always ready to listen and help. How are you feeling today, sweetie?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const apiKey = 'AIzaSyBcF1oZBxu60O45ZfGD3f717fXa9EhoU0g';

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a warm, caring AI companion for a women's wellness app called Blushy Tomato. You're like a supportive best friend who understands periods, emotions, and women's health. Speak warmly, empathetically, and offer helpful advice. Use caring language with occasional emojis. Be supportive but not overly clinical. Always be encouraging and understanding.

User message: ${userMessage}

Please respond with warmth, empathy, and helpful advice in a caring, friendly tone.`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here for you, honey! Let me know how I can help support you today. 💕";
    } catch (error) {
      console.error('AI API Error:', error);
      return "I'm having a little trouble right now, but I'm still here for you! Try asking me again, sweetie. 💕";
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const aiResponse = await generateAIResponse(chatInput.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Something went wrong on my end, but remember - you're amazing and I'm here for you! Try asking me again. 💪💕",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  if (!aiPermissionEnabled) return null;

  return (
    <>
      {/* AI Chat Toggle - Responsive positioning */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={onToggleChat}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 animate-float"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* AI Chat Window - Enhanced Messenger Style */}
      {showAIChatDialog && (
        <div className="fixed inset-0 z-40 flex items-end justify-center p-4 bg-black/40 backdrop-blur-lg animate-fade-in">
          <div className="w-full max-w-md h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-soft">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">Your AI Companion</h3>
                <p className="text-sm text-gray-500">Always here for you 💕</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleChat}
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white via-rose-50/20 to-pink-50/30">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-3xl text-sm shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-br-lg'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-lg'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white p-4 rounded-3xl rounded-bl-lg border border-gray-100 shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <Input
                  placeholder="How are you feeling today, sweetie?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  disabled={isChatLoading}
                  className="flex-1 rounded-full border-2 border-gray-100 focus:border-rose-300 px-6 py-3 transition-all duration-300"
                />
                <Button
                  onClick={handleChatSend}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
