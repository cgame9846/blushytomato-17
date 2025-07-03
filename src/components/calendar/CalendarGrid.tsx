
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Heart } from 'lucide-react';
import { CalendarDay } from './CalendarTypes';

interface CalendarGridProps {
  currentDate: Date;
  calendarDays: CalendarDay[];
  isCalendarAnimating: boolean;
  showMonthYearSelector: boolean;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onToggleMonthYearSelector: () => void;
  onDayClick: (day: CalendarDay) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  calendarDays,
  isCalendarAnimating,
  showMonthYearSelector,
  onNavigateMonth,
  onToggleMonthYearSelector,
  onDayClick
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

  const getDayClassName = (day: CalendarDay) => {
    let className = "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer relative mx-auto hover:scale-105 ";
    
    if (!day.isCurrentMonth) {
      className += "text-gray-300 opacity-40 hover:opacity-60 ";
    } else {
      const phase = getDayPhase(day.date);
      className += getDayColor(day.date, phase) + " ";
    }
    
    if (day.isToday) {
      className += "ring-2 ring-rose-400 ring-offset-1 font-bold animate-pulse-soft ";
    }
    
    if (day.isPeriod) {
      className += "bg-red-500 text-white shadow-md ";
    } else {
      className += "hover:bg-gray-100 ";
    }
    
    return className;
  };

  return (
    <>
      {/* Responsive Month/Year Toggle */}
      <div className="text-center mb-4 sm:mb-6">
        <Button
          variant="outline"
          onClick={onToggleMonthYearSelector}
          className="text-base sm:text-lg font-bold text-gray-800 hover:text-rose-600 transition-colors border-gray-200 hover:border-rose-300 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl"
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Enhanced Responsive Calendar */}
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateMonth('prev')}
              className="h-10 w-10 sm:h-14 sm:w-14 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </Button>
            
            <CardTitle className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Calendar View
            </CardTitle>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateMonth('next')}
              className="h-10 w-10 sm:h-14 sm:w-14 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-8 pb-8 sm:pb-10">
          {/* Responsive Day Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs sm:text-sm font-bold text-gray-400 py-2 sm:py-4">
                {day}
              </div>
            ))}
          </div>
          
          {/* Responsive Calendar Grid */}
          <div className={`grid grid-cols-7 gap-2 sm:gap-3 mb-6 sm:mb-8 transition-all duration-300 ${isCalendarAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {calendarDays.map((day, index) => (
              <div 
                key={index}
                className={getDayClassName(day)}
                onClick={() => onDayClick(day)}
                style={{animationDelay: `${index * 0.01}s`}}
              >
                <span className="text-xs sm:text-sm">{day.date}</span>
                {day.hasSex && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                    <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CalendarGrid;
