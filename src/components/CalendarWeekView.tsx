
import React from 'react';

interface CalendarWeekViewProps {
  currentDate: Date;
  selectedDate: number;
  cycleData: {[key: string]: any};
  onDateClick: (day: number) => void;
}

const CalendarWeekView = ({ currentDate, selectedDate, cycleData, onDateClick }: CalendarWeekViewProps) => {
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  const currentDay = isCurrentMonth ? today.getDate() : null;

  const getDaysInMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPeriod: false
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
      const savedData = cycleData[dayKey];
      
      days.push({
        day,
        isCurrentMonth: true,
        isPeriod: savedData?.isPeriod || false,
        isToday: day === currentDay
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPeriod: false
      });
    }
    
    return days;
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-fade-in">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => (
          <div 
            key={index}
            className={`
              relative h-10 w-10 flex items-center justify-center text-sm cursor-pointer rounded-full transition-all duration-200
              ${!dayData.isCurrentMonth 
                ? 'text-gray-300 hover:bg-gray-50' 
                : 'text-gray-700 hover:bg-gray-100'
              }
              ${selectedDate === dayData.day && dayData.isCurrentMonth ? 'bg-rose-100 text-rose-700 font-semibold' : ''}
              ${dayData.isToday ? 'ring-2 ring-rose-400 font-bold' : ''}
            `}
            onClick={() => dayData.isCurrentMonth && onDateClick(dayData.day)}
          >
            {dayData.isToday ? 'T' : dayData.day}
            
            {/* Period indicator - smaller red dot */}
            {dayData.isPeriod && dayData.isCurrentMonth && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWeekView;
