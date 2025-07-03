
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import UserSettings from '@/components/UserSettings';

interface CalendarHeaderProps {
  currentDate: Date;
  currentPhase: { name: string; emoji: string; dayLabel: string };
  aiPermissionEnabled: boolean;
  hasPeriodData: boolean;
  onAIPermissionChange: (enabled: boolean) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onCalendarOpen: () => void;
  onLogPeriod: () => void;
}

const CalendarHeader = ({
  currentDate,
  currentPhase,
  aiPermissionEnabled,
  hasPeriodData,
  onAIPermissionChange,
  onMonthChange,
  onCalendarOpen,
  onLogPeriod
}: CalendarHeaderProps) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDayBackground = (phase: string) => {
    switch (phase) {
      case 'period':
        return 'from-red-100 to-red-200';
      case 'fertile':
        return 'from-green-100 to-green-200';
      case 'ovulation':
        return 'from-blue-100 to-blue-200';
      case 'high-pregnancy':
        return 'from-green-100 to-green-200';
      case 'pms':
        return 'from-orange-100 to-orange-200';
      default:
        return 'from-teal-100 to-teal-200';
    }
  };

  return (
    <div className={`bg-gradient-to-b ${getDayBackground(currentPhase.name)} rounded-b-3xl px-4 sm:px-6 pt-8 pb-6 mb-6 animate-slide-up`}>
      <div className="flex items-center justify-between mb-4">
        <UserSettings 
          onAIPermissionChange={onAIPermissionChange}
          aiPermissionEnabled={aiPermissionEnabled}
        />
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange('prev')}
            className="text-gray-700 hover:bg-white/20 hover-lift h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="text-gray-700 font-medium text-sm sm:text-lg min-w-[100px] sm:min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange('next')}
            className="text-gray-700 hover:bg-white/20 hover-lift h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCalendarOpen}
          className="text-gray-700 hover:bg-white/20 hover-lift w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full"
        >
          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Prediction Section */}
      <div className="text-center animate-scale-in">
        {!hasPeriodData ? (
          <>
            <p className="text-gray-700 text-xs sm:text-sm font-medium mb-2">Prediction:</p>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 animate-fade-in">{currentPhase.dayLabel}</h2>
            <Button 
              onClick={onLogPeriod}
              className="bg-white text-teal-600 hover:bg-gray-50 rounded-full px-4 sm:px-6 py-2 font-medium shadow-sm hover-lift animate-glow text-sm sm:text-base"
            >
              Log period
            </Button>
          </>
        ) : (
          <div className="bg-white/80 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-gray-700 text-sm font-medium mb-2">Period logged! 🩸</p>
            <p className="text-gray-600 text-xs">Your cycle data is being tracked</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarHeader;
