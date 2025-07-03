
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarYearViewProps {
  currentDate: Date;
  onNavigateYear: (direction: 'prev' | 'next') => void;
  onMonthSelect: (month: number) => void;
  onBackToCalendar: () => void;
}

const CalendarYearView: React.FC<CalendarYearViewProps> = ({
  currentDate,
  onNavigateYear,
  onMonthSelect,
  onBackToCalendar
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateMonthDays = (month: number) => {
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <div className="animate-fade-in">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateYear('prev')}
              className="h-10 w-10 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>
            
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              {currentDate.getFullYear()}
            </CardTitle>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateYear('next')}
              className="h-10 w-10 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToCalendar}
            className="text-rose-600 hover:bg-white/80 rounded-2xl px-6 py-3 transition-all duration-300 hover:shadow-md self-center"
          >
            ← Back to Calendar
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {monthNames.map((month, index) => (
              <div key={index} className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onMonthSelect(index);
                    onBackToCalendar();
                  }}
                  className="w-full p-2 h-auto flex flex-col rounded-2xl hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 transition-all duration-300"
                >
                  <div className="text-sm font-bold text-gray-800 mb-2">{month}</div>
                  <div className="grid grid-cols-7 gap-0.5 text-xs">
                    {generateMonthDays(index).slice(0, 21).map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-4 h-4 flex items-center justify-center ${
                          day ? 'text-gray-600' : ''
                        }`}
                      >
                        {day && day <= 21 ? day : ''}
                      </div>
                    ))}
                    {generateMonthDays(index).length > 21 && (
                      <div className="col-span-7 text-center text-gray-400">...</div>
                    )}
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarYearView;
