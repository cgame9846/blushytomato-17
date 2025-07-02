
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Activity, 
  Heart, 
  Droplets, 
  Thermometer, 
  Moon, 
  Zap, 
  Brain,
  X,
  Check,
  Coffee,
  Dumbbell,
  Smile
} from 'lucide-react';

interface TrackPagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  showFullContent?: boolean;
}

const TrackPagePopup: React.FC<TrackPagePopupProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  showFullContent = false 
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [flow, setFlow] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [hasSex, setHasSex] = useState(false);
  const [temperature, setTemperature] = useState<string>('');
  const [sleep, setSleep] = useState<string>('');
  const [exercise, setExercise] = useState<string>('');
  const [water, setWater] = useState<number>(0);
  const [weight, setWeight] = useState<string>('');

  const symptoms = [
    { name: 'Cramps', icon: '😣', category: 'pain' },
    { name: 'Headache', icon: '🤕', category: 'pain' },
    { name: 'Back pain', icon: '😖', category: 'pain' },
    { name: 'Bloating', icon: '😮‍💨', category: 'digestive' },
    { name: 'Nausea', icon: '🤢', category: 'digestive' },
    { name: 'Fatigue', icon: '😴', category: 'energy' },
    { name: 'Mood swings', icon: '😭', category: 'emotional' },
    { name: 'Irritability', icon: '😠', category: 'emotional' },
    { name: 'Anxiety', icon: '😰', category: 'emotional' },
    { name: 'Breast tenderness', icon: '🤱', category: 'physical' },
    { name: 'Acne', icon: '😷', category: 'skin' },
    { name: 'Food cravings', icon: '🍫', category: 'appetite' }
  ];

  const flowOptions = [
    { name: 'Light', color: 'bg-rose-200', icon: '💧' },
    { name: 'Medium', color: 'bg-rose-400', icon: '💧💧' },
    { name: 'Heavy', color: 'bg-rose-600', icon: '💧💧💧' }
  ];

  const moodOptions = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-100' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-100' },
    { name: 'Angry', emoji: '😠', color: 'bg-red-100' },
    { name: 'Anxious', emoji: '😰', color: 'bg-purple-100' },
    { name: 'Calm', emoji: '😌', color: 'bg-green-100' },
    { name: 'Energetic', emoji: '⚡', color: 'bg-orange-100' }
  ];

  const sleepOptions = [
    { name: 'Poor', emoji: '😴', hours: '<6' },
    { name: 'Fair', emoji: '😐', hours: '6-7' },
    { name: 'Good', emoji: '😊', hours: '7-8' },
    { name: 'Great', emoji: '😍', hours: '8+' }
  ];

  const exerciseOptions = [
    { name: 'None', emoji: '🛋️' },
    { name: 'Light', emoji: '🚶' },
    { name: 'Moderate', emoji: '🏃' },
    { name: 'Intense', emoji: '💪' }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    const data = {
      symptoms: selectedSymptoms,
      flow,
      mood,
      notes,
      hasSex,
      temperature,
      sleep,
      exercise,
      water,
      weight,
      timestamp: new Date()
    };
    onSave(data);
    // Reset form
    setSelectedSymptoms([]);
    setFlow('');
    setMood('');
    setNotes('');
    setHasSex(false);
    setTemperature('');
    setSleep('');
    setExercise('');
    setWater(0);
    setWeight('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 -m-6 mb-6 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  {showFullContent ? 'Track Everything Today' : 'Track Today'}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  {showFullContent ? 'Complete daily health tracking' : 'Log your symptoms and feelings'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full hover:bg-white/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Flow Section */}
          <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-rose-500" />
              Period Flow
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {flowOptions.map((option) => (
                <Button
                  key={option.name}
                  variant={flow === option.name ? "default" : "outline"}
                  onClick={() => setFlow(option.name)}
                  className={`h-16 rounded-2xl flex flex-col gap-1 ${
                    flow === option.name 
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white' 
                      : 'hover:bg-rose-50'
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Symptoms
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom) => (
                <Button
                  key={symptom.name}
                  variant={selectedSymptoms.includes(symptom.name) ? "default" : "outline"}
                  onClick={() => handleSymptomToggle(symptom.name)}
                  className={`h-20 rounded-2xl flex flex-col gap-2 text-center ${
                    selectedSymptoms.includes(symptom.name)
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white'
                      : 'hover:bg-rose-50'
                  }`}
                >
                  <span className="text-xl">{symptom.icon}</span>
                  <span className="text-xs font-medium">{symptom.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Mood Section */}
          <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
              <Brain className="h-5 w-5 text-rose-500" />
              How are you feeling?
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {moodOptions.map((option) => (
                <Button
                  key={option.name}
                  variant={mood === option.name ? "default" : "outline"}
                  onClick={() => setMood(option.name)}
                  className={`h-16 rounded-2xl flex flex-col gap-1 ${
                    mood === option.name 
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white' 
                      : `hover:${option.color}`
                  }`}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Sexual Activity */}
          <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Sexual Activity
            </Label>
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-lg">💕</span>
                <span className="text-sm text-gray-700">Had sexual activity today?</span>
              </div>
              <Switch
                checked={hasSex}
                onCheckedChange={setHasSex}
              />
            </div>
          </div>

          {/* Additional Tracking - Only show if showFullContent is true */}
          {showFullContent && (
            <>
              {/* Temperature */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  Body Temperature (°F)
                </Label>
                <input
                  type="number"
                  placeholder="98.6"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-rose-300 outline-none"
                />
              </div>

              {/* Sleep Quality */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  Sleep Quality
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {sleepOptions.map((option) => (
                    <Button
                      key={option.name}
                      variant={sleep === option.name ? "default" : "outline"}
                      onClick={() => setSleep(option.name)}
                      className={`h-16 rounded-2xl flex flex-col gap-1 ${
                        sleep === option.name 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                          : 'hover:bg-indigo-50'
                      }`}
                    >
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-xs">{option.name} ({option.hours}h)</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Exercise */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-green-500" />
                  Exercise Level
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {exerciseOptions.map((option) => (
                    <Button
                      key={option.name}
                      variant={exercise === option.name ? "default" : "outline"}
                      onClick={() => setExercise(option.name)}
                      className={`h-16 rounded-2xl flex flex-col gap-1 ${
                        exercise === option.name 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                          : 'hover:bg-green-50'
                      }`}
                    >
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-xs">{option.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Water Intake */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-blue-500" />
                  Water Intake (glasses)
                </Label>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWater(Math.max(0, water - 1))}
                    className="w-10 h-10 rounded-full"
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold text-blue-600 min-w-[3rem] text-center">{water}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWater(water + 1)}
                    className="w-10 h-10 rounded-full"
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 ml-2">glasses today</span>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Weight (lbs)
                </Label>
                <input
                  type="number"
                  placeholder="120"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-rose-300 outline-none"
                />
              </div>
            </>
          )}

          {/* Notes Section */}
          <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700">Additional Notes</Label>
            <Textarea
              placeholder="Any other thoughts or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-2xl border-2 border-gray-100 focus:border-rose-300 resize-none"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold text-lg hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 shadow-lg"
          >
            <Check className="h-5 w-5 mr-2" />
            {showFullContent ? 'Save All Data' : 'Save Today\'s Data'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackPagePopup;
