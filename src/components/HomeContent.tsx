
import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarWeekView from './CalendarWeekView';
import DailyInsights from './DailyInsights';
import QuickActions from './QuickActions';
import CycleInsights from './CycleInsights';

interface HomeContentProps {
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

const HomeContent = ({
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
}: HomeContentProps) => {
  return (
    <div className="space-y-0 animate-fade-in">
      <CalendarHeader
        currentDate={currentDate}
        currentPhase={currentPhase}
        aiPermissionEnabled={aiPermissionEnabled}
        hasPeriodData={hasPeriodData}
        onAIPermissionChange={onAIPermissionChange}
        onMonthChange={onMonthChange}
        onCalendarOpen={onCalendarOpen}
        onLogPeriod={onLogPeriod}
      />
      
      <div className="px-4 sm:px-6 mb-6">
        <CalendarWeekView
          currentDate={currentDate}
          selectedDate={selectedDate}
          cycleData={cycleData}
          onDateClick={onDateClick}
        />
      </div>

      <DailyInsights onTrackClick={onTrackClick} />
      <QuickActions onChatClick={onChatClick} onPremiumClick={onPremiumClick} />
      
      <div className="px-4 sm:px-6">
        <CycleInsights />
      </div>
    </div>
  );
};

export default HomeContent;
