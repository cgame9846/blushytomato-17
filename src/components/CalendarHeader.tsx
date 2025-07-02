
import React from 'react';
import { Button } from '@/components/ui/button';
import UserSettings from '@/components/UserSettings';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { CycleData } from '@/hooks/useCycleData';

interface CalendarHeaderProps {
  currentDate: Date;
  selectedDate: number;
  cycleData: CycleData;
  aiPermissionEnabled: boolean;
  onAIPermissionChange: (enabled: boolean) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onCalendarClick: () => void;
  onDateClick: (day: number) => void;
  onLogPeriod: () => void;
  getDayPhase: (dayNumber: number) => string;
  getDayColor: (dayNumber: number, phase: string) => string;
  getDayBackground: (phase: string) => string;
  getCurrentPhase: () => { name: string; emoji: string; dayLabel: string };
}

const CalendarHeader = ({
  currentDate,
  selectedDate,
  cycleData,
  aiPermissionEnabled,
  onAIPermissionChange,
  onMonthChange,
  onCalendarClick,
  onDateClick,
  onLogPeriod,
  getDayPhase,
  getDayColor,
  getDayBackground,
  getCurrentPhase
}: CalendarHeaderProps) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateCalendarDaysForCurrentMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - startDayOfWeek);
    
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      
      const isToday = today.getDate() === currentDay.getDate() && 
                     today.getMonth() === currentDay.getMonth() && 
                     today.getFullYear() === currentDay.getFullYear();

      const isCurrentMonth = currentDay.getMonth() === month;
      const phase = getDayPhase(currentDay.getDate());
      const dayKey = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
      const dayData = cycleData[dayKey];
      
      days.push({
        number: currentDay.getDate(),
        isSelected: currentDay.getDate() === selectedDate && isCurrentMonth,
        isToday,
        isCurrentMonth,
        phase,
        isPeriod: dayData?.isPeriod || phase === 'period',
        hasSex: dayData?.hasSex || false,
        isHighPregnancy: phase === 'high-pregnancy',
        isOvulation: phase === 'ovulation'
      });
    }
    
    return days;
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className={`bg-gradient-to-b ${getDayBackground(currentPhase.name)} rounded-b-3xl px-4 pt-8 pb-6 mb-6 animate-slide-up`}>
      <div className="flex items-center justify-between mb-4">
        <UserSettings 
          onAIPermissionChange={onAIPermissionChange}
          aiPermissionEnabled={aiPermissionEnabled}
        />
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange('prev')}
            className="text-gray-700 hover:bg-white/20 hover-lift"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-gray-700 font-medium text-lg min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange('next')}
            className="text-gray-700 hover:bg-white/20 hover-lift"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCalendarClick}
          className="text-gray-700 hover:bg-white/20 hover-lift w-8 h-8 p-0 rounded-full"
        >
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
          const calendarDays = generateCalendarDaysForCurrentMonth();
          const dayData = calendarDays[index];
          const isSelected = dayData?.isSelected;
          const isCurrentMonth = dayData?.isCurrentMonth;
          const phase = dayData?.phase;
          const isToday = dayData?.isToday;

          return (
            <div key={index} className="text-center relative">
              <div className="text-xs text-gray-600 mb-2">{day}</div>
              <button
                onClick={() => onDateClick(dayData?.number || 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover-lift relative ${
                  isToday 
                    ? 'bg-white text-teal-600 shadow-lg ring-2 ring-teal-400 ring-offset-2 animate-pulse-soft' 
                    : isSelected 
                    ? 'bg-white text-teal-600 shadow-sm animate-bounce-gentle' 
                    : isCurrentMonth
                    ? `${getDayColor(dayData?.number || 1, phase || 'normal')} hover:bg-white/50`
                    : 'text-gray-400 hover:bg-white/30'
                }`}
              >
                {dayData?.number || 1}
                
                {dayData?.isHighPregnancy && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-green-500 rounded-full bg-transparent animate-pulse">
                    <div className="absolute inset-0.5 bg-green-500 rounded-full opacity-60"></div>
                  </div>
                )}
                
                {dayData?.isOvulation && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-blue-500 rounded-full bg-transparent animate-pulse">
                    <div className="absolute inset-0.5 bg-blue-500 rounded-full opacity-60"></div>
                  </div>
                )}
                
                {dayData?.hasSex && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center animate-scale-in">
        <p className="text-gray-700 text-sm font-medium mb-2">Prediction:</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in">{currentPhase.dayLabel}</h2>
        <Button 
          onClick={onLogPeriod}
          className="bg-white text-teal-600 hover:bg-gray-50 rounded-full px-6 py-2 font-medium shadow-sm hover-lift animate-glow"
        >
          Log period
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
