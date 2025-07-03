
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface CalendarDay {
  number: number;
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  phase: string;
  isPeriod: boolean;
  hasSex: boolean;
  isHighPregnancy: boolean;
  isOvulation: boolean;
}

interface CalendarWeekViewProps {
  currentDate: Date;
  selectedDate: number;
  cycleData: {[key: string]: any};
  onDateClick: (day: number) => void;
}

const CalendarWeekView = ({ currentDate, selectedDate, cycleData, onDateClick }: CalendarWeekViewProps) => {
  const getDayPhase = (dayNumber: number) => {
    if (dayNumber >= 1 && dayNumber <= 5) return 'period';
    if (dayNumber >= 10 && dayNumber <= 16) return 'fertile';
    if (dayNumber === 14) return 'ovulation';
    if (dayNumber >= 12 && dayNumber <= 16) return 'high-pregnancy';
    if (dayNumber >= 22 && dayNumber <= 28) return 'pms';
    return 'normal';
  };

  const getDayColor = (dayNumber: number, phase: string) => {
    switch (phase) {
      case 'period':
        return 'text-red-600 font-bold';
      case 'fertile':
        return 'text-green-600 font-bold';
      case 'ovulation':
        return 'text-blue-600 font-bold';
      case 'high-pregnancy':
        return 'text-green-600 font-bold';
      case 'pms':
        return 'text-orange-600 font-bold';
      default:
        return 'text-gray-700';
    }
  };

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

  return (
    <div className="flex justify-between items-center mb-6 gap-1 sm:gap-2">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
        const calendarDays = generateCalendarDaysForCurrentMonth();
        const dayData = calendarDays[index];
        return (
          <div key={index} className="text-center relative flex-1">
            <div className="text-xs text-gray-600 mb-2">{day}</div>
            <button
              onClick={() => onDateClick(dayData?.number || 1)}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 hover-lift relative mx-auto ${
                dayData?.isToday 
                  ? 'bg-white text-teal-600 shadow-lg ring-2 ring-teal-400 ring-offset-2 animate-pulse-soft' 
                  : dayData?.isSelected 
                  ? 'bg-white text-teal-600 shadow-sm animate-bounce-gentle' 
                  : dayData?.isCurrentMonth
                  ? `${getDayColor(dayData?.number || 1, getDayPhase(dayData?.number || 1))} hover:bg-white/50`
                  : 'text-gray-400 hover:bg-white/30'
              }`}
            >
              {dayData?.number || 1}
              
              {dayData?.isHighPregnancy && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 border-2 border-green-500 rounded-full bg-transparent animate-pulse">
                  <div className="absolute inset-0.5 bg-green-500 rounded-full opacity-60"></div>
                </div>
              )}
              
              {dayData?.isOvulation && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 border-2 border-blue-500 rounded-full bg-transparent animate-pulse">
                  <div className="absolute inset-0.5 bg-blue-500 rounded-full opacity-60"></div>
                </div>
              )}
              
              {dayData?.hasSex && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                  <Heart className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-pink-500 fill-pink-500" />
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeekView;
