import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Plus, Volume2, Heart, Bell } from 'lucide-react';

const EnhancedSymptomTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [waterIntake, setWaterIntake] = useState(8);
  const [sleepHours, setSleepHours] = useState(8);
  const [notes, setNotes] = useState('');
  const [customInputs, setCustomInputs] = useState<{[key: string]: string}>({});
  const [pillReminders, setPillReminders] = useState<{[key: string]: { name: string; time: string; enabled: boolean }}>({});
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [speakInsights, setSpeakInsights] = useState(false);

  const symptomCategories = {
    sexAndDrive: [
      { id: 'no-sex', label: "Didn't have sex", emoji: '❌' },
      { id: 'protected-sex', label: 'Protected sex', emoji: '🛡️' },
      { id: 'unprotected-sex', label: 'Unprotected sex', emoji: '💗' },
      { id: 'oral-sex', label: 'Oral sex', emoji: '💋' },
      { id: 'anal-sex', label: 'Anal sex', emoji: '🍑' },
      { id: 'masturbation', label: 'Masturbation', emoji: '✨' },
      { id: 'sensual-touch', label: 'Sensual touch', emoji: '🤗' },
      { id: 'sex-toys', label: 'Sex toys', emoji: '🎭' },
      { id: 'orgasm', label: 'Orgasm', emoji: '🌟' },
      { id: 'high-sex-drive', label: 'High sex drive', emoji: '🔥' },
      { id: 'neutral-sex-drive', label: 'Neutral sex drive', emoji: '😐' },
      { id: 'low-sex-drive', label: 'Low sex drive', emoji: '😴' },
    ],
    mood: [
      { id: 'calm', label: 'Calm', emoji: '😌' },
      { id: 'happy', label: 'Happy', emoji: '😊' },
      { id: 'energetic', label: 'Energetic', emoji: '⚡' },
      { id: 'frisky', label: 'Frisky', emoji: '😏' },
      { id: 'mood-swings', label: 'Mood swings', emoji: '🎭' },
      { id: 'irritated', label: 'Irritated', emoji: '😤' },
      { id: 'sad', label: 'Sad', emoji: '😢' },
      { id: 'anxious', label: 'Anxious', emoji: '😰' },
      { id: 'depressed', label: 'Depressed', emoji: '😞' },
      { id: 'feeling-guilty', label: 'Feeling guilty', emoji: '😔' },
      { id: 'obsessive-thoughts', label: 'Obsessive thoughts', emoji: '🌀' },
      { id: 'low-energy', label: 'Low energy', emoji: '🔋' },
      { id: 'apathetic', label: 'Apathetic', emoji: '😑' },
      { id: 'confused', label: 'Confused', emoji: '😵‍💫' },
      { id: 'very-self-critical', label: 'Very self critical', emoji: '😖' },
    ],
    symptoms: [
      { id: 'everything-fine', label: 'Everything is fine', emoji: '✅' },
      { id: 'cramps', label: 'Cramps', emoji: '😣' },
      { id: 'tender-breast', label: 'Tender breast', emoji: '💔' },
      { id: 'headache', label: 'Headache', emoji: '😵' },
      { id: 'acne', label: 'Acne', emoji: '😳' },
      { id: 'backache', label: 'Backache', emoji: '🔥' },
      { id: 'fatigue', label: 'Fatigue', emoji: '😴' },
      { id: 'cravings', label: 'Cravings', emoji: '🍫' },
      { id: 'abdominal-pain', label: 'Abdominal pain', emoji: '🤕' },
      { id: 'vaginal-itching', label: 'Vaginal itching', emoji: '😬' },
      { id: 'vaginal-dryness', label: 'Vaginal dryness', emoji: '🏜️' },
    ],
    discharge: [
      { id: 'no-discharge', label: 'No discharge', emoji: '❌' },
      { id: 'creamy', label: 'Creamy', emoji: '🥛' },
      { id: 'watery', label: 'Watery', emoji: '💧' },
      { id: 'sticky', label: 'Sticky', emoji: '🍯' },
      { id: 'egg-white', label: 'Egg white', emoji: '🥚' },
      { id: 'spotting', label: 'Spotting', emoji: '🩸' },
      { id: 'unusual', label: 'Unusual', emoji: '⚠️' },
      { id: 'clumpy-white', label: 'Clumpy white', emoji: '🧀' },
      { id: 'gray', label: 'Gray', emoji: '⚫' },
    ],
    digestAndStool: [
      { id: 'nausea', label: 'Nausea', emoji: '🤢' },
      { id: 'bloating', label: 'Bloating', emoji: '🎈' },
      { id: 'constipation', label: 'Constipation', emoji: '🚫' },
      { id: 'diarrhea', label: 'Diarrhea', emoji: '💨' },
    ],
    pregnancyTest: [
      { id: 'no-test', label: "Didn't take test", emoji: '❌' },
      { id: 'positive', label: 'Positive', emoji: '✅' },
      { id: 'negative', label: 'Negative', emoji: '❌' },
      { id: 'faint-line', label: 'Faint line', emoji: '📏' },
    ],
    other: [
      { id: 'travel', label: 'Travel', emoji: '✈️' },
      { id: 'stress', label: 'Stress', emoji: '😵‍💫' },
      { id: 'meditation', label: 'Meditation', emoji: '🧘‍♀️' },
      { id: 'journaling', label: 'Journaling', emoji: '📝' },
      { id: 'kegel-exercise', label: 'Kegel exercise', emoji: '💪' },
      { id: 'disease-injury', label: 'Disease or injury', emoji: '🤕' },
      { id: 'alcohol', label: 'Alcohol', emoji: '🍷' },
    ],
    physicalActivity: [
      { id: 'no-exercise', label: "Didn't exercise", emoji: '❌' },
      { id: 'yoga', label: 'Yoga', emoji: '🧘‍♀️' },
      { id: 'gym', label: 'Gym', emoji: '🏋️‍♀️' },
      { id: 'aerobics-dancing', label: 'Aerobics and dancing', emoji: '💃' },
      { id: 'swimming', label: 'Swimming', emoji: '🏊‍♀️' },
      { id: 'team-sports', label: 'Team sports', emoji: '⚽' },
      { id: 'running', label: 'Running', emoji: '🏃‍♀️' },
      { id: 'cycling', label: 'Cycling', emoji: '🚴‍♀️' },
      { id: 'walking', label: 'Walking', emoji: '🚶‍♀️' },
    ]
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const addCustomInput = (category: string, value: string) => {
    if (value.trim()) {
      setCustomInputs(prev => ({ ...prev, [category]: value }));
    }
  };

  const addPillReminder = () => {
    const id = Date.now().toString();
    setPillReminders(prev => ({
      ...prev,
      [id]: { name: '', time: '09:00', enabled: true }
    }));
  };

  const updatePillReminder = (id: string, field: string, value: string | boolean) => {
    setPillReminders(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const deletePillReminder = (id: string) => {
    setPillReminders(prev => {
      const newReminders = { ...prev };
      delete newReminders[id];
      return newReminders;
    });
  };

  const generateAIInsights = () => {
    const insights = [];
    
    // Mood-based insights
    if (selectedMood === 'anxious' || selectedSymptoms.includes('obsessive-thoughts')) {
      insights.push("Hey sweetie, I noticed you're feeling anxious today. Remember, this is totally normal during certain parts of your cycle! Try some deep breathing - you've got this! 💕");
    }
    
    if (selectedMood === 'energetic' && selectedSymptoms.includes('high-sex-drive')) {
      insights.push("Girl, you're radiating energy today! This could be your body's way of saying you're in your fertile window. Perfect time for some self-care or quality time with your partner! ✨");
    }

    // Symptom patterns
    if (selectedSymptoms.includes('cramps') && selectedSymptoms.includes('fatigue')) {
      insights.push("Oh honey, cramps AND fatigue? Your body is working hard right now. Make sure to drink plenty of water and maybe treat yourself to a warm bath. You deserve some extra TLC! 🛁");
    }

    // Activity insights
    if (selectedSymptoms.includes('no-exercise') && selectedMood === 'low-energy') {
      insights.push("I totally get it - some days we just don't have the energy. Maybe try a gentle walk or some light stretching? Even 5 minutes can make you feel better, mama! 🚶‍♀️");
    }

    // Health insights
    if (selectedSymptoms.includes('egg-white') && selectedSymptoms.includes('high-sex-drive')) {
      insights.push("Your body is giving you all the signs - you might be ovulating! This is prime fertile territory if you're trying to conceive, or time to be extra careful if you're not! 🥚");
    }

    return insights.length > 0 ? insights : ["You're doing amazing by tracking your symptoms! Every data point helps us understand your beautiful, unique cycle better. Keep it up, queen! 👑"];
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSave = () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      symptoms: selectedSymptoms,
      mood: selectedMood,
      waterIntake,
      sleepHours,
      notes,
      customInputs,
      pillReminders
    };
    console.log('Saving comprehensive entry:', entry);
    setShowAIInsights(true);
    
    if (speakInsights) {
      const insights = generateAIInsights();
      setTimeout(() => {
        speakText(insights[0]);
      }, 500);
    }
  };

  const renderCategorySection = (categoryKey: string, categoryName: string, items: any[]) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gradient capitalize">{categoryName}</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map(item => (
          <Button
            key={item.id}
            variant={selectedSymptoms.includes(item.id) ? "default" : "outline"}
            size="sm"
            className={`h-auto py-2 flex items-center justify-start gap-2 text-xs hover-lift ${
              selectedSymptoms.includes(item.id) ? 'gradient-primary text-white' : ''
            }`}
            onClick={() => toggleSymptom(item.id)}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </Button>
        ))}
        
        {/* Custom input for each category */}
        <div className="col-span-2 mt-2">
          <Input
            placeholder={`Add custom ${categoryName.toLowerCase()}...`}
            className="text-xs"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addCustomInput(categoryKey, (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          {customInputs[categoryKey] && (
            <Badge variant="secondary" className="mt-1 text-xs">
              ✨ {customInputs[categoryKey]}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gradient flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Complete Daily Tracking
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your bestie AI is ready to give you personalized insights! 💕
          </p>
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <Switch 
                checked={speakInsights} 
                onCheckedChange={setSpeakInsights}
              />
              <Volume2 className="h-4 w-4" />
              Speak insights
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            
            <TabsContent value="symptoms" className="space-y-6 mt-4">
              {renderCategorySection('sexAndDrive', 'Sex & Sex Drive', symptomCategories.sexAndDrive)}
              {renderCategorySection('symptoms', 'Physical Symptoms', symptomCategories.symptoms)}
              {renderCategorySection('discharge', 'Vaginal Discharge', symptomCategories.discharge)}
              {renderCategorySection('digestAndStool', 'Digestion & Stool', symptomCategories.digestAndStool)}
              {renderCategorySection('pregnancyTest', 'Pregnancy Test', symptomCategories.pregnancyTest)}
            </TabsContent>
            
            <TabsContent value="lifestyle" className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="water">💧 Water (glasses)</Label>
                  <Input
                    id="water"
                    type="number"
                    min="0"
                    max="20"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(parseInt(e.target.value))}
                    className="focus-ring"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sleep">😴 Sleep (hours)</Label>
                  <Input
                    id="sleep"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="focus-ring"
                  />
                </div>
              </div>
              
              {renderCategorySection('physicalActivity', 'Physical Activity', symptomCategories.physicalActivity)}
              {renderCategorySection('other', 'Other Activities', symptomCategories.other)}
              
              {/* Pills Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gradient">💊 Pills & Reminders</h3>
                  <Button
                    onClick={addPillReminder}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 hover-lift"
                  >
                    <Plus className="h-3 w-3" />
                    Add Pill
                  </Button>
                </div>
                
                {Object.entries(pillReminders).map(([id, reminder]) => (
                  <Card key={id} className="p-3 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Pill name"
                        value={reminder.name}
                        onChange={(e) => updatePillReminder(id, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="time"
                        value={reminder.time}
                        onChange={(e) => updatePillReminder(id, 'time', e.target.value)}
                        className="w-24"
                      />
                      <Switch
                        checked={reminder.enabled}
                        onCheckedChange={(checked) => updatePillReminder(id, 'enabled', checked)}
                      />
                      <Button
                        onClick={() => deletePillReminder(id)}
                        size="sm"
                        variant="destructive"
                        className="px-2"
                      >
                        ×
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mood" className="space-y-4 mt-4">
              {renderCategorySection('mood', 'How are you feeling?', symptomCategories.mood)}
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="notes">💭 Daily Notes & Thoughts</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[100px] p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell me about your day, any thoughts, feelings, or observations... I'm here to listen! 💕"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleSave}
            className="w-full mt-6 gradient-primary text-white hover:opacity-90 transition-opacity hover-lift"
          >
            💝 Save & Get AI Insights
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      {showAIInsights && (
        <Card className="gradient-secondary border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your AI Bestie Says...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generateAIInsights().map((insight, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg flex items-start gap-2">
                <span className="text-lg">💕</span>
                <p className="text-sm text-gray-700 flex-1">{insight}</p>
                {speakInsights && (
                  <Button
                    onClick={() => speakText(insight)}
                    size="sm"
                    variant="ghost"
                    className="p-1"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Summary Section */}
      {(selectedSymptoms.length > 0 || selectedMood || notes || Object.keys(customInputs).length > 0) && (
        <Card className="gradient-secondary border-primary/20 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-base">📊 Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedMood && (
              <div>
                <p className="text-sm font-medium mb-2">Mood:</p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {symptomCategories.mood.find(m => m.id === selectedMood)?.emoji} {symptomCategories.mood.find(m => m.id === selectedMood)?.label}
                </Badge>
              </div>
            )}
            
            {selectedSymptoms.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Tracked Items:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSymptoms.slice(0, 8).map(symptomId => {
                    const allSymptoms = Object.values(symptomCategories).flat();
                    const symptom = allSymptoms.find(s => s.id === symptomId);
                    return (
                      <Badge key={symptomId} variant="outline" className="text-xs">
                        {symptom?.emoji} {symptom?.label}
                      </Badge>
                    );
                  })}
                  {selectedSymptoms.length > 8 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedSymptoms.length - 8} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {Object.keys(customInputs).length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Custom Notes:</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(customInputs).map(([category, value]) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      ✨ {value}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>💧 Water: {waterIntake} glasses</div>
              <div>😴 Sleep: {sleepHours} hours</div>
            </div>

            {Object.keys(pillReminders).length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">💊 Active Reminders:</p>
                {Object.entries(pillReminders)
                  .filter(([_, reminder]) => reminder.enabled && reminder.name)
                  .map(([id, reminder]) => (
                    <Badge key={id} variant="outline" className="text-xs mr-1">
                      <Bell className="h-3 w-3 mr-1" />
                      {reminder.name} at {reminder.time}
                    </Badge>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSymptomTracker;