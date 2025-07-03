
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Droplet, Sparkles, Heart } from 'lucide-react';
import { CalendarDay } from './CalendarTypes';

interface CalendarDayDialogProps {
  selectedDay: CalendarDay | null;
  currentDate: Date;
  onClose: () => void;
  onSaveDayData: (dayData: Partial<CalendarDay>) => void;
}

const CalendarDayDialog: React.FC<CalendarDayDialogProps> = ({
  selectedDay,
  currentDate,
  onClose,
  onSaveDayData
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const symptoms = [
    'Cramps', 'Bloating', 'Headache', 'Mood swings', 'Fatigue', 
    'Breast tenderness', 'Acne', 'Back pain', 'Food cravings'
  ];

  if (!selectedDay) return null;

  return (
    <Dialog open={!!selectedDay} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md rounded-3xl border-0 shadow-2xl animate-scale-in">
        <DialogHeader className="pb-6 sm:pb-8">
          <DialogTitle className="flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 rounded-full">
              <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-rose-600" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {selectedDay.date}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-normal">
                How are you feeling?
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <Label className="text-base sm:text-lg font-bold text-gray-700 flex items-center gap-2">
              <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
              Period Status
            </Label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant={selectedDay.isPeriod ? "default" : "outline"}
                size="sm"
                onClick={() => onSaveDayData({ isPeriod: !selectedDay.isPeriod })}
                className={`rounded-full transition-all duration-300 text-xs sm:text-sm ${selectedDay.isPeriod ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md'}`}
              >
                <Droplet className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Period Day
              </Button>
              {selectedDay.isPeriod && (
                <div className="flex gap-1 sm:gap-2 animate-slide-up">
                  {['light', 'medium', 'heavy'].map(flow => (
                    <Button
                      key={flow}
                      variant={selectedDay.flow === flow ? "default" : "outline"}
                      size="sm"
                      className={`text-xs rounded-full capitalize transition-all duration-300 ${
                        selectedDay.flow === flow ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md'
                      }`}
                      onClick={() => onSaveDayData({ flow: flow as 'light' | 'medium' | 'heavy' })}
                    >
                      {flow}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Label className="text-base sm:text-lg font-bold text-gray-700 flex items-center gap-2">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
              Symptoms
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {symptoms.map(symptom => (
                <Button
                  key={symptom}
                  variant={selectedDay.symptoms?.includes(symptom) ? "default" : "outline"}
                  size="sm"
                  className={`text-xs sm:text-sm h-auto py-3 sm:py-4 rounded-2xl transition-all duration-300 ${
                    selectedDay.symptoms?.includes(symptom) ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => {
                    const currentSymptoms = selectedDay.symptoms || [];
                    const newSymptoms = currentSymptoms.includes(symptom)
                      ? currentSymptoms.filter(s => s !== symptom)
                      : [...currentSymptoms, symptom];
                    onSaveDayData({ symptoms: newSymptoms });
                  }}
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Label htmlFor="notes" className="text-base sm:text-lg font-bold text-gray-700 flex items-center gap-2">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
              Daily Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling today? Any thoughts or reflections..."
              value={selectedDay.notes || ''}
              onChange={(e) => onSaveDayData({ notes: e.target.value })}
              className="text-xs sm:text-sm rounded-2xl border-2 border-gray-100 resize-none focus:border-rose-300 transition-all duration-300 p-3 sm:p-4"
              rows={4}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDayDialog;
