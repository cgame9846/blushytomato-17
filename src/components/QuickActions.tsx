
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Sparkles } from 'lucide-react';

interface QuickActionsProps {
  onChatClick: () => void;
  onPremiumClick: () => void;
}

const QuickActions = ({ onChatClick, onPremiumClick }: QuickActionsProps) => {
  return (
    <div className="px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card 
          className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
          onClick={onChatClick}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-xs font-medium text-gray-700">AI Chat</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
          onClick={onPremiumClick}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 mx-auto mb-2 animate-bounce-gentle" />
            <p className="text-xs font-medium text-gray-700">Premium</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;
