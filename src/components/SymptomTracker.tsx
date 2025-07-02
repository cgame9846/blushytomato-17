
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SymptomTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');

  const symptoms = [
    { id: 'cramps', label: 'Cramps', emoji: '😣' },
    { id: 'headache', label: 'Headache', emoji: '😵' },
    { id: 'bloating', label: 'Bloating', emoji: '🎈' },
    { id: 'fatigue', label: 'Fatigue', emoji: '😴' },
    { id: 'nausea', label: 'Nausea', emoji: '🤢' },
    { id: 'backache', label: 'Back Pain', emoji: '🔥' },
    { id: 'acne', label: 'Acne', emoji: '😳' },
    { id: 'cravings', label: 'Cravings', emoji: '🍫' },
  ];

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { id: 'irritable', label: 'Irritable', emoji: '😤', color: 'bg-red-100 text-red-700 border-red-300' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    console.log('Saving symptoms:', selectedSymptoms);
    console.log('Saving mood:', selectedMood);
    // In real app, this would save to database
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gradient">
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Mood</h3>
            <div className="grid grid-cols-3 gap-2">
              {moods.map(mood => (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  className={`h-auto py-3 flex flex-col items-center gap-1 ${
                    selectedMood === mood.id ? 'gradient-primary text-white' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Symptoms</h3>
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map(symptom => (
                <Button
                  key={symptom.id}
                  variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                  className={`h-auto py-3 flex items-center justify-start gap-2 ${
                    selectedSymptoms.includes(symptom.id) ? 'gradient-primary text-white' : ''
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <span className="text-sm">{symptom.emoji}</span>
                  <span className="text-xs">{symptom.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
          >
            Save Today's Entry
          </Button>
        </CardContent>
      </Card>

      {(selectedSymptoms.length > 0 || selectedMood) && (
        <Card className="gradient-secondary border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedMood && (
              <div>
                <p className="text-sm font-medium mb-2">Mood:</p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {moods.find(m => m.id === selectedMood)?.emoji} {moods.find(m => m.id === selectedMood)?.label}
                </Badge>
              </div>
            )}
            
            {selectedSymptoms.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Symptoms:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSymptoms.map(symptomId => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <Badge key={symptomId} variant="outline" className="text-xs">
                        {symptom?.emoji} {symptom?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomTracker;
