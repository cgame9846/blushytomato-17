
import React from 'react';
import { Activity, MessageCircle, Heart, Crown, Home } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'track', label: 'Track', icon: Activity },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'partner', label: 'Partner', icon: Heart },
    { id: 'premium', label: 'Premium', icon: Crown }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-3 px-4 transition-all duration-200 ${
                  isActive 
                    ? 'text-rose-500' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-rose-500' : ''}`} />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-rose-500 font-semibold' : 'text-gray-400'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-rose-500 rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
