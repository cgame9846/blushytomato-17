
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isPeriod: boolean;
  isFertile: boolean;
  isPMS: boolean;
  isOvulation: boolean;
  isToday: boolean;
}

const CycleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPeriod: false,
        isFertile: false,
        isPMS: false,
        isOvulation: false,
        isToday: false,
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const isToday = today.getDate() === date && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      
      // Mock cycle data - in real app this would come from user data
      const isPeriod = date >= 1 && date <= 5;
      const isFertile = date >= 10 && date <= 16;
      const isOvulation = date === 14;
      const isPMS = date >= 22 && date <= 28;
      
      days.push({
        date,
        isCurrentMonth: true,
        isPeriod,
        isFertile,
        isPMS,
        isOvulation,
        isToday,
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        isPeriod: false,
        isFertile: false,
        isPMS: false,
        isOvulation: false,
        isToday: false,
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayClassName = (day: CalendarDay) => {
    let className = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-110 ";
    
    if (!day.isCurrentMonth) {
      className += "text-muted-foreground opacity-50 ";
    } else {
      className += "text-foreground ";
    }
    
    if (day.isToday) {
      className += "ring-2 ring-primary ring-offset-2 ";
    }
    
    if (day.isPeriod) {
      className += "bg-red-100 text-red-700 border-2 border-red-300 ";
    } else if (day.isOvulation) {
      className += "bg-blue-100 text-blue-700 border-2 border-blue-300 ";
    } else if (day.isFertile) {
      className += "bg-green-100 text-green-700 border-2 border-green-300 ";
    } else if (day.isPMS) {
      className += "bg-orange-100 text-orange-700 border-2 border-orange-300 ";
    } else {
      className += "hover:bg-primary/10 ";
    }
    
    return className;
  };

  const calendarDays = generateCalendarDays();

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <CardTitle className="text-lg font-semibold text-gradient">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className={getDayClassName(day)}>
              {day.date}
            </div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-300 border border-red-400"></div>
            <span>Period</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-300 border border-green-400"></div>
            <span>Fertile Window</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-300 border border-blue-400"></div>
            <span>Ovulation</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-300 border border-orange-400"></div>
            <span>PMS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleCalendar;
