
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

interface CalendarDateSelectorProps {
  currentDate: Date;
  onMonthYearChange: (type: 'month' | 'year', value: string) => void;
  onBack: () => void;
}

const CalendarDateSelector: React.FC<CalendarDateSelectorProps> = ({
  currentDate,
  onMonthYearChange,
  onBack
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="animate-fade-in">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-rose-600 hover:bg-white/80 rounded-2xl px-6 py-3 transition-all duration-300 hover:shadow-md"
            >
              ← Back
            </Button>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Select Date
            </CardTitle>
            <div className="w-20"></div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          <div className="space-y-8">
            <div className="animate-slide-up">
              <Label className="text-sm font-bold text-gray-700 mb-4 block flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                Month
              </Label>
              <Select
                value={currentDate.getMonth().toString()}
                onValueChange={(value) => onMonthYearChange('month', value)}
              >
                <SelectTrigger className="w-full h-16 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-lg">
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
            
            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Label className="text-sm font-bold text-gray-700 mb-4 block flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                Year
              </Label>
              <Select
                value={currentDate.getFullYear().toString()}
                onValueChange={(value) => onMonthYearChange('year', value)}
              >
                <SelectTrigger className="w-full h-16 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-lg">
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
            onClick={onBack}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-slide-up"
            style={{animationDelay: '0.2s'}}
          >
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarDateSelector;
