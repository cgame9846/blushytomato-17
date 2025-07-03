
import React from 'react';
import { Activity, MessageCircle, Users, Sparkles } from 'lucide-react';
import HomeContent from './HomeContent';
import EnhancedSymptomTracker from './EnhancedSymptomTracker';
import AIAssistant from './AIAssistant';
import PartnerConnection from './PartnerConnection';
import Subscription from './Subscription';

interface TabContentProps {
  activeTab: string;
  currentDate: Date;
  selectedDate: number;
  currentPhase: { name: string; emoji: string; dayLabel: string };
  aiPermissionEnabled: boolean;
  hasPeriodData: boolean;
  cycleData: {[key: string]: any};
  onAIPermissionChange: (enabled: boolean) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onCalendarOpen: () => void;
  onLogPeriod: () => void;
  onDateClick: (day: number) => void;
  onTrackClick: () => void;
  onChatClick: () => void;
  onPremiumClick: () => void;
}

const TabContent = ({
  activeTab,
  currentDate,
  selectedDate,
  currentPhase,
  aiPermissionEnabled,
  hasPeriodData,
  cycleData,
  onAIPermissionChange,
  onMonthChange,
  onCalendarOpen,
  onLogPeriod,
  onDateClick,
  onTrackClick,
  onChatClick,
  onPremiumClick
}: TabContentProps) => {
  const renderTabHeader = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="pt-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg mb-3">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'home':
      return (
        <HomeContent
          currentDate={currentDate}
          selectedDate={selectedDate}
          currentPhase={currentPhase}
          aiPermissionEnabled={aiPermissionEnabled}
          hasPeriodData={hasPeriodData}
          cycleData={cycleData}
          onAIPermissionChange={onAIPermissionChange}
          onMonthChange={onMonthChange}
          onCalendarOpen={onCalendarOpen}
          onLogPeriod={onLogPeriod}
          onDateClick={onDateClick}
          onTrackClick={onTrackClick}
          onChatClick={onChatClick}
          onPremiumClick={onPremiumClick}
        />
      );
    
    case 'track':
      return (
        <div className="space-y-6 animate-fade-in">
          {renderTabHeader(
            <Activity className="h-6 w-6 text-white" />,
            'Track',
            'Log symptoms and daily observations'
          )}
          <EnhancedSymptomTracker />
        </div>
      );
    
    case 'chat':
      return (
        <div className="space-y-6 animate-fade-in">
          {renderTabHeader(
            <MessageCircle className="h-6 w-6 text-white" />,
            'AI Assistant',
            'Your personal health companion'
          )}
          <AIAssistant />
        </div>
      );

    case 'partner':
      return (
        <div className="space-y-6 animate-fade-in">
          {renderTabHeader(
            <Users className="h-6 w-6 text-white" />,
            'Partner',
            'Share your journey together'
          )}
          <PartnerConnection />
        </div>
      );

    case 'premium':
      return (
        <div className="space-y-6 animate-fade-in">
          {renderTabHeader(
            <Sparkles className="h-6 w-6 text-white" />,
            'Premium',
            'Unlock advanced features'
          )}
          <Subscription />
        </div>
      );
    
    default:
      return null;
  }
};

export default TabContent;
