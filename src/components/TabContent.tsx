
import React from 'react';
import HomeContent from '@/components/HomeContent';
import EnhancedSymptomTracker from '@/components/EnhancedSymptomTracker';
import AIAssistant from '@/components/AIAssistant';
import PartnerConnection from '@/components/PartnerConnection';
import Subscription from '@/components/Subscription';
import { Activity, MessageCircle, Users, Sparkles } from 'lucide-react';
import { CycleData } from '@/hooks/useCycleData';

interface TabContentProps {
  activeTab: string;
  currentDate: Date;
  selectedDate: number;
  cycleData: CycleData;
  aiPermissionEnabled: boolean;
  onAIPermissionChange: (enabled: boolean) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onCalendarClick: () => void;
  onDateClick: (day: number) => void;
  onLogPeriod: () => void;
  onTabChange: (tab: string) => void;
  getDayPhase: (dayNumber: number) => string;
  getDayColor: (dayNumber: number, phase: string) => string;
  getDayBackground: (phase: string) => string;
  getCurrentPhase: () => { name: string; emoji: string; dayLabel: string };
}

const TabContent = ({
  activeTab,
  currentDate,
  selectedDate,
  cycleData,
  aiPermissionEnabled,
  onAIPermissionChange,
  onMonthChange,
  onCalendarClick,
  onDateClick,
  onLogPeriod,
  onTabChange,
  getDayPhase,
  getDayColor,
  getDayBackground,
  getCurrentPhase
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
          cycleData={cycleData}
          aiPermissionEnabled={aiPermissionEnabled}
          onAIPermissionChange={onAIPermissionChange}
          onMonthChange={onMonthChange}
          onCalendarClick={onCalendarClick}
          onDateClick={onDateClick}
          onLogPeriod={onLogPeriod}
          onTabChange={onTabChange}
          getDayPhase={getDayPhase}
          getDayColor={getDayColor}
          getDayBackground={getDayBackground}
          getCurrentPhase={getCurrentPhase}
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
