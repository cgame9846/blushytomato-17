
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Droplet, Zap, Moon, Sun, Calendar } from 'lucide-react';

const CycleInsights = () => {
  // Enhanced cycle calculation logic
  const today = new Date();
  const cycleStartDate = new Date('2024-12-25'); // Last period start date
  const daysSinceStart = Math.floor((today.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const averageCycleLength = 28;
  const cycleDay = ((daysSinceStart % averageCycleLength) + 1);
  
  // Accurate phase detection
  const getCurrentPhase = (day: number) => {
    if (day >= 1 && day <= 5) return 'Menstrual';
    if (day >= 6 && day <= 13) return 'Follicular';
    if (day >= 14 && day <= 16) return 'Ovulatory';
    if (day >= 17 && day <= 28) return 'Luteal';
    return 'Follicular';
  };

  const currentPhase = getCurrentPhase(cycleDay);
  const daysUntilPeriod = averageCycleLength - cycleDay;
  const currentCycleProgress = (cycleDay / averageCycleLength) * 100;

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Menstrual': return 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 border-rose-200';
      case 'Follicular': return 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200';
      case 'Ovulatory': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200';
      case 'Luteal': return 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Menstrual': return <Droplet className="h-4 w-4" />;
      case 'Follicular': return <Sun className="h-4 w-4" />;
      case 'Ovulatory': return <Zap className="h-4 w-4" />;
      case 'Luteal': return <Moon className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getPhaseMessage = (phase: string) => {
    switch (phase) {
      case 'Menstrual':
        return "Time to rest and be gentle with yourself. Your body is working hard 💕";
      case 'Follicular':
        return "Your energy is building - perfect time for new projects and goals! ✨";
      case 'Ovulatory':
        return "You're at your peak - social and creative energy is high! 🌟";
      case 'Luteal':
        return "Nesting mode activated - perfect for self-care and planning 🕯️";
      default:
        return "Listen to your body and track your symptoms 💝";
    }
  };

  const getEnergyLevel = (phase: string) => {
    switch (phase) {
      case 'Menstrual': return { level: 30, color: 'from-rose-400 to-rose-600', label: 'Rest & Recover' };
      case 'Follicular': return { level: 70, color: 'from-pink-400 to-purple-600', label: 'Rising Energy' };
      case 'Ovulatory': return { level: 95, color: 'from-blue-400 to-cyan-600', label: 'Peak Power' };
      case 'Luteal': return { level: 50, color: 'from-amber-400 to-orange-600', label: 'Steady Focus' };
      default: return { level: 50, color: 'from-gray-400 to-gray-600', label: 'Balanced' };
    }
  };

  const energyData = getEnergyLevel(currentPhase);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Phase Card */}
      <Card className="gradient-secondary border-primary/20 shadow-xl rounded-3xl overflow-hidden hover-lift">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gradient flex items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-lg animate-pulse-soft">
              {getPhaseIcon(currentPhase)}
            </div>
            Current Phase
            <Badge className={`${getPhaseColor(currentPhase)} border-2 px-4 py-2 rounded-full text-sm font-semibold animate-scale-in`}>
              {currentPhase}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getPhaseMessage(currentPhase)}
          </p>
          
          {/* Cycle Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Cycle Progress
              </span>
              <span className="text-primary font-bold">Day {cycleDay} of {averageCycleLength}</span>
            </div>
            <div className="relative">
              <Progress value={currentCycleProgress} className="h-3 rounded-full bg-gradient-to-r from-pink-100 to-purple-100" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-full opacity-80" 
                   style={{ width: `${currentCycleProgress}%` }} />
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Energy Level
              </span>
              <span className="text-primary font-bold">{energyData.label}</span>
            </div>
            <div className="relative">
              <Progress value={energyData.level} className="h-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200" />
              <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${energyData.color} rounded-full transition-all duration-1000 animate-shimmer`}
                   style={{ width: `${energyData.level}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center hover-lift bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 rounded-2xl shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2 animate-bounce-gentle">
              {daysUntilPeriod > 0 ? daysUntilPeriod : 'Today!'}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Days until period
            </div>
          </CardContent>
        </Card>

        <Card className="text-center hover-lift bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 rounded-2xl shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2 animate-bounce-gentle">
              {averageCycleLength}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Average cycle
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Daily Tips */}
      <Card className="hover-lift rounded-3xl shadow-xl bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gradient flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary animate-pulse-soft" />
            Today's Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
              <span className="text-white text-lg">🥗</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Nutrition Focus</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentPhase === 'Menstrual' ? 'Iron-rich foods like spinach and lentils will help replenish energy' :
                 currentPhase === 'Follicular' ? 'Fresh fruits and whole grains support your rising energy levels' :
                 currentPhase === 'Ovulatory' ? 'Antioxidant-rich berries and leafy greens boost your peak performance' :
                 'Magnesium-rich foods like nuts and dark chocolate can help with mood balance'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg">
              <span className="text-white text-lg">💪</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Movement Suggestion</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentPhase === 'Menstrual' ? 'Gentle yoga or light stretching to ease discomfort' :
                 currentPhase === 'Follicular' ? 'Perfect time for cardio and strength training as energy builds' :
                 currentPhase === 'Ovulatory' ? 'High-intensity workouts and dance - you can handle anything!' :
                 'Moderate activities like walking or pilates work best right now'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg">
              <span className="text-white text-lg">💧</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Hydration Goal</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Aim for 8-10 glasses of water today. Add lemon or cucumber for extra refreshment!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleInsights;
