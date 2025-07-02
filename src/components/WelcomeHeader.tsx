
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, Sparkles } from 'lucide-react';

const WelcomeHeader = () => {
  const currentDate = new Date();
  const timeOfDay = currentDate.getHours() < 12 ? 'morning' : 
                   currentDate.getHours() < 18 ? 'afternoon' : 'evening';
  
  const greeting = `Good ${timeOfDay}!`;
  
  // Mock user data - in real app this would come from auth
  const userName = "Sarah";

  // Enhanced cycle calculation
  const cycleStartDate = new Date('2024-12-25');
  const daysSinceStart = Math.floor((currentDate.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const averageCycleLength = 28;
  const cycleDay = ((daysSinceStart % averageCycleLength) + 1);
  
  const getCurrentPhase = (day: number) => {
    if (day >= 1 && day <= 5) return { name: 'Menstrual', emoji: '🌙', color: 'from-rose-500 to-red-500' };
    if (day >= 6 && day <= 13) return { name: 'Follicular', emoji: '🌱', color: 'from-pink-500 to-purple-500' };
    if (day >= 14 && day <= 16) return { name: 'Ovulatory', emoji: '✨', color: 'from-blue-500 to-cyan-500' };
    if (day >= 17 && day <= 28) return { name: 'Luteal', emoji: '🍂', color: 'from-amber-500 to-orange-500' };
    return { name: 'Follicular', emoji: '🌱', color: 'from-pink-500 to-purple-500' };
  };

  const currentPhase = getCurrentPhase(cycleDay);
  const daysUntilPeriod = averageCycleLength - cycleDay;

  return (
    <Card className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 border-0 shadow-2xl mb-6 rounded-3xl overflow-hidden animate-fade-in hover-lift">
      <CardContent className="pt-8 pb-8 px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {greeting} {userName}
              </h1>
              <div className="text-3xl animate-bounce-gentle">
                {currentPhase.emoji}
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <Badge className={`bg-gradient-to-r ${currentPhase.color} text-white border-0 px-4 py-2 rounded-full shadow-lg animate-pulse-soft`}>
              Day {cycleDay}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full shadow-lg">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  {currentPhase.name} Phase
                  <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse-soft" />
                </h3>
                <p className="text-sm text-gray-600">
                  {currentPhase.name === 'Menstrual' ? 'Time for rest and self-care' :
                   currentPhase.name === 'Follicular' ? 'Energy is building - perfect for new goals!' :
                   currentPhase.name === 'Ovulatory' ? 'You\'re at your peak - embrace your power!' :
                   'Focus on planning and nourishing yourself'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">
                Next period in {daysUntilPeriod > 0 ? `${daysUntilPeriod} days` : 'today'}
              </span>
              <span className="text-primary font-semibold">
                {currentPhase.name === 'Ovulatory' ? 'High fertility' :
                 currentPhase.name === 'Follicular' ? 'Low fertility' :
                 currentPhase.name === 'Luteal' ? 'Low fertility' :
                 'Not fertile'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
