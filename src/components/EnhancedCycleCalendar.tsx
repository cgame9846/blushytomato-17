
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CalendarDateSelector from './calendar/CalendarDateSelector';
import CalendarGrid from './calendar/CalendarGrid';
import CalendarDayDialog from './calendar/CalendarDayDialog';
import CalendarLegend from './calendar/CalendarLegend';
import AIChat from './calendar/AIChat';
import { CalendarDay, EnhancedCycleCalendarProps } from './calendar/CalendarTypes';

const EnhancedCycleCalendar: React.FC<EnhancedCycleCalendarProps> = ({ 
  showAIChat = false,
  aiPermissionEnabled = false,
  onClose,
  cycleData = {},
  onCycleDataUpdate = () => {},
  hasPeriodData = false
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'monthYear'>('calendar');
  const [showPeriodReminder, setShowPeriodReminder] = useState(!hasPeriodData);
  const [showAIChatDialog, setShowAIChatDialog] = useState(false);
  const [showMonthYearSelector, setShowMonthYearSelector] = useState(false);
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);

  const getDayPhase = (dayNumber: number) => {
    if (dayNumber >= 1 && dayNumber <= 5) return 'period';
    if (dayNumber >= 10 && dayNumber <= 16) return 'fertile';
    if (dayNumber === 14) return 'ovulation';
    if (dayNumber >= 12 && dayNumber <= 16) return 'high-pregnancy';
    if (dayNumber >= 22 && dayNumber <= 28) return 'pms';
    return 'normal';
  };

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
      const dayKey = `${year}-${month-1}-${prevMonth.getDate() - i}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(prevMonth.getDate() - i);
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday: false,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const isToday = today.getDate() === date && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      
      const dayKey = `${year}-${month}-${date}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(date);
      
      days.push({
        date,
        isCurrentMonth: true,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      const dayKey = `${year}-${month+1}-${date}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(date);
      days.push({
        date,
        isCurrentMonth: false,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday: false,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsCalendarAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
        return newDate;
      });
      setIsCalendarAnimating(false);
    }, 150);
  };

  const handleMonthYearChange = (type: 'month' | 'year', value: string) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (type === 'month') {
        newDate.setMonth(parseInt(value));
      } else {
        newDate.setFullYear(parseInt(value));
      }
      return newDate;
    });
    setShowMonthYearSelector(false);
  };

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay({...day, date: day.date});
  };

  const saveDayData = (dayData: Partial<CalendarDay>) => {
    if (!selectedDay) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayKey = `${year}-${month}-${selectedDay.date}`;
    
    const updatedCycleData = {
      ...cycleData,
      [dayKey]: {
        ...cycleData[dayKey],
        ...selectedDay,
        ...dayData
      }
    };
    
    onCycleDataUpdate(updatedCycleData);
    setSelectedDay(null);
  };

  const handleLogPeriod = () => {
    const today = new Date();
    const dayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    const updatedCycleData = {
      ...cycleData,
      [dayKey]: {
        date: today.getDate(),
        isCurrentMonth: true,
        isPeriod: true,
        isFertile: false,
        isPMS: false,
        isOvulation: false,
        isToday: true,
        flow: 'medium'
      }
    };
    
    onCycleDataUpdate(updatedCycleData);
    setShowPeriodReminder(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const calendarDays = generateCalendarDays();

  // Month/Year Selection View
  if (viewMode === 'monthYear') {
    return (
      <CalendarDateSelector
        currentDate={currentDate}
        onMonthYearChange={handleMonthYearChange}
        onBack={() => setViewMode('calendar')}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 relative animate-fade-in">
      {/* Responsive Close Button */}
      {onClose && (
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-600 hover:text-rose-600 text-sm sm:text-base"
          >
            ← Back to Home
          </Button>
        </div>
      )}

      {/* Responsive Month/Year Selector Dropdown */}
      {showMonthYearSelector && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowMonthYearSelector(false)}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Month</Label>
                    <Select
                      value={currentDate.getMonth().toString()}
                      onValueChange={(value) => handleMonthYearChange('month', value)}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {monthNames.map((month, index) => (
                          <SelectItem key={index} value={index.toString()} className="rounded-xl py-3">
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Year</Label>
                    <Select
                      value={currentDate.getFullYear().toString()}
                      onValueChange={(value) => handleMonthYearChange('year', value)}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()} className="rounded-xl py-3">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  onClick={() => setShowMonthYearSelector(false)}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Done
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <AIChat
        aiPermissionEnabled={aiPermissionEnabled}
        showAIChatDialog={showAIChatDialog}
        onToggleChat={() => setShowAIChatDialog(!showAIChatDialog)}
      />

      {/* Enhanced Period Reminder - Show only if no period data */}
      {showPeriodReminder && !hasPeriodData && (
        <Card className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 border-0 shadow-xl rounded-3xl animate-slide-up">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-white rounded-full shadow-lg animate-pulse-soft">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-gray-800">Period starts in 5 days</p>
                  <p className="text-xs sm:text-sm text-gray-600">Low chance of pregnancy</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  size="sm" 
                  onClick={handleLogPeriod}
                  className="h-10 sm:h-12 text-xs sm:text-sm bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-full px-4 sm:px-6 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Log Period
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full hover:bg-white/80 transition-all duration-300"
                  onClick={() => setShowPeriodReminder(false)}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <CalendarGrid
        currentDate={currentDate}
        calendarDays={calendarDays}
        isCalendarAnimating={isCalendarAnimating}
        showMonthYearSelector={showMonthYearSelector}
        onNavigateMonth={navigateMonth}
        onToggleMonthYearSelector={() => setShowMonthYearSelector(!showMonthYearSelector)}
        onDayClick={handleDayClick}
      />

      <CalendarDayDialog
        selectedDay={selectedDay}
        currentDate={currentDate}
        onClose={() => setSelectedDay(null)}
        onSaveDayData={saveDayData}
      />

      <CalendarLegend />
    </div>
  );
};

export default EnhancedCycleCalendar;
