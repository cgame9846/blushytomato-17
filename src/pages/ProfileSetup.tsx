
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Heart, Target, Stethoscope, Settings } from 'lucide-react';

interface ProfileSetupProps {
  onSetupComplete: () => void;
}

const ProfileSetup = ({ onSetupComplete }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
    birthControl: '',
    birthControlOther: '',
    goals: [] as string[],
    trackingMode: '',
    symptoms: [] as string[],
    lifestyle: {
      exercise: '',
      sleep: '',
      stress: ''
    }
  });

  const goals = [
    { id: 'track-cycle', label: 'Track my cycle', emoji: '📅' },
    { id: 'get-pregnant', label: 'Trying to conceive', emoji: '🤱' },
    { id: 'avoid-pregnancy', label: 'Avoid pregnancy', emoji: '🛡️' },
    { id: 'understand-body', label: 'Understand my body', emoji: '💝' },
    { id: 'manage-symptoms', label: 'Manage symptoms', emoji: '🌸' },
    { id: 'improve-health', label: 'Improve health', emoji: '✨' }
  ];

  const birthControlOptions = [
    'None', 'Birth Control Pills', 'IUD', 'Implant', 'Ring', 'Patch', 'Condoms', 'Other'
  ];

  const trackingModes = [
    { id: 'cycle', label: 'Cycle Tracking', desc: 'Track periods, ovulation, and symptoms', emoji: '🌙' },
    { id: 'conceive', label: 'Trying to Conceive', desc: 'Optimize fertility and track ovulation', emoji: '🤱' },
    { id: 'pregnancy', label: 'Pregnancy Mode', desc: 'Week-by-week pregnancy tracking', emoji: '👶' }
  ];

  const commonSymptoms = [
    'Cramps', 'Bloating', 'Mood swings', 'Headaches', 'Fatigue', 'Breast tenderness',
    'Food cravings', 'Acne', 'Back pain', 'Insomnia', 'Anxiety', 'Depression'
  ];

  const toggleGoal = (goalId: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const toggleSymptom = (symptom: string) => {
    setProfile(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Save profile data to localStorage or send to backend
      localStorage.setItem('userProfile', JSON.stringify(profile));
      console.log('Profile setup complete:', profile);
      onSetupComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return <User className="h-6 w-6" />;
      case 2: return <Heart className="h-6 w-6" />;
      case 3: return <Calendar className="h-6 w-6" />;
      case 4: return <Stethoscope className="h-6 w-6" />;
      case 5: return <Target className="h-6 w-6" />;
      case 6: return <Settings className="h-6 w-6" />;
      default: return <User className="h-6 w-6" />;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's get to know you! 💕</h2>
              <p className="text-sm text-gray-600">This helps us personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">What should we call you?</Label>
                <Input
                  id="name"
                  placeholder="Your name or nickname"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12 rounded-xl border-2 focus:border-rose-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-700">How old are you?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                  className="h-12 rounded-xl border-2 focus:border-rose-400"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Physical Information 📏</h2>
              <p className="text-sm text-gray-600">Help us provide better health insights</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-semibold text-gray-700">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 165"
                  value={profile.height}
                  onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                  className="h-12 rounded-xl border-2 focus:border-rose-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 60"
                  value={profile.weight}
                  onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                  className="h-12 rounded-xl border-2 focus:border-rose-400"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-xs text-blue-700">
                  💡 This information helps us provide personalized health insights and is kept completely private.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cycle Information 📅</h2>
              <p className="text-sm text-gray-600">Help us predict your next period</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last-period" className="text-sm font-semibold text-gray-700">When did your last period start?</Label>
                <Input
                  id="last-period"
                  type="date"
                  value={profile.lastPeriodDate}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
                  className="h-12 rounded-xl border-2 focus:border-rose-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cycle-length" className="text-sm font-semibold text-gray-700">Cycle Length (days)</Label>
                  <Input
                    id="cycle-length"
                    type="number"
                    min="21"
                    max="40"
                    value={profile.cycleLength}
                    onChange={(e) => setProfile(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                    className="h-12 rounded-xl border-2 focus:border-rose-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period-length" className="text-sm font-semibold text-gray-700">Period Length (days)</Label>
                  <Input
                    id="period-length"
                    type="number"
                    min="2"
                    max="10"
                    value={profile.periodLength}
                    onChange={(e) => setProfile(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                    className="h-12 rounded-xl border-2 focus:border-rose-400"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Common Symptoms 🩺</h2>
              <p className="text-sm text-gray-600">Which symptoms do you typically experience?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map(symptom => (
                <Button
                  key={symptom}
                  variant={profile.symptoms.includes(symptom) ? "default" : "outline"}
                  className={`h-12 text-sm rounded-xl transition-all duration-300 ${
                    profile.symptoms.includes(symptom) 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg' 
                      : 'hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Goals 🎯</h2>
              <p className="text-sm text-gray-600">What do you want to achieve?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {goals.map(goal => (
                <Button
                  key={goal.id}
                  variant={profile.goals.includes(goal.id) ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center gap-2 text-sm rounded-xl transition-all duration-300 ${
                    profile.goals.includes(goal.id) 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg' 
                      : 'hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <span className="text-2xl">{goal.emoji}</span>
                  <span className="text-center leading-tight">{goal.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              <Label className="text-sm font-semibold text-gray-700">Birth Control (Optional)</Label>
              <div className="grid grid-cols-2 gap-3">
                {birthControlOptions.map(option => (
                  <Button
                    key={option}
                    variant={profile.birthControl === option ? "default" : "outline"}
                    className={`h-12 text-sm rounded-xl transition-all duration-300 ${
                      profile.birthControl === option 
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg' 
                        : 'hover:shadow-md hover:scale-105'
                    }`}
                    onClick={() => setProfile(prev => ({ ...prev, birthControl: option }))}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {profile.birthControl === 'Other' && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="birth-control-other" className="text-sm font-semibold text-gray-700">Please specify:</Label>
                  <Input
                    id="birth-control-other"
                    placeholder="Type your birth control method"
                    value={profile.birthControlOther}
                    onChange={(e) => setProfile(prev => ({ ...prev, birthControlOther: e.target.value }))}
                    className="h-12 rounded-xl border-2 focus:border-rose-400"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getStepIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Mode 🌟</h2>
              <p className="text-sm text-gray-600">Select your primary tracking focus</p>
            </div>
            
            <div className="space-y-4">
              {trackingModes.map(mode => (
                <Card 
                  key={mode.id} 
                  className={`cursor-pointer transition-all duration-300 rounded-xl ${
                    profile.trackingMode === mode.id 
                      ? 'ring-2 ring-rose-400 bg-gradient-to-r from-rose-50 to-pink-50 shadow-lg' 
                      : 'hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => setProfile(prev => ({ ...prev, trackingMode: mode.id }))}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{mode.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{mode.label}</h3>
                        <p className="text-sm text-gray-600">{mode.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return profile.name.trim() && profile.age.trim();
      case 2: return profile.height.trim() && profile.weight.trim();
      case 3: return profile.lastPeriodDate.trim();
      case 4: return true; // Symptoms are optional
      case 5: return profile.goals.length > 0;
      case 6: return profile.trackingMode.trim();
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-sm font-medium text-gray-500">
              Step {step} of 6
            </CardTitle>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-gradient-to-r from-rose-400 to-pink-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          {renderStep()}
          
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex-1 h-12 rounded-xl border-2 hover:shadow-md transition-all duration-300"
              >
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              disabled={!isStepValid()}
            >
              {step === 6 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
