
import React from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import DailyInsights from '@/components/DailyInsights';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Sparkles } from 'lucide-react';
import { CycleData } from '@/hooks/useCycleData';

interface HomeContentProps {
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

const HomeContent = ({
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
}: HomeContentProps) => {
  return (
    <div className="space-y-0 animate-fade-in">
      <CalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        cycleData={cycleData}
        aiPermissionEnabled={aiPermissionEnabled}
        onAIPermissionChange={onAIPermissionChange}
        onMonthChange={onMonthChange}
        onCalendarClick={onCalendarClick}
        onDateClick={onDateClick}
        onLogPeriod={onLogPeriod}
        getDayPhase={getDayPhase}
        getDayColor={getDayColor}
        getDayBackground={getDayBackground}
        getCurrentPhase={getCurrentPhase}
      />

      <DailyInsights onTrackClick={() => onTabChange('track')} />

      <div className="px-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
            style={{ animationDelay: '0.4s' }}
            onClick={() => onTabChange('chat')}
          >
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 text-blue-500 mx-auto mb-2 animate-bounce-gentle" />
              <p className="text-xs font-medium text-gray-700">AI Chat</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
            style={{ animationDelay: '0.5s' }}
            onClick={() => onTabChange('premium')}
          >
            <CardContent className="p-4 text-center">
              <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2 animate-bounce-gentle" />
              <p className="text-xs font-medium text-gray-700">Premium</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
