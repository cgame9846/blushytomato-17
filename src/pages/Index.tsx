import React, { useState } from 'react';
import Introduction from '@/components/Introduction';
import Auth from './Auth';
import ProfileSetup from './ProfileSetup';
import WelcomeHeader from '@/components/WelcomeHeader';
import EnhancedCycleCalendar from '@/components/EnhancedCycleCalendar';
import CycleInsights from '@/components/CycleInsights';
import EnhancedSymptomTracker from '@/components/EnhancedSymptomTracker';
import AIAssistant from '@/components/AIAssistant';
import PartnerConnection from '@/components/PartnerConnection';
import Subscription from '@/components/Subscription';
import Navigation from '@/components/Navigation';
import UserSettings from '@/components/UserSettings';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Calendar as CalendarIcon, Activity, MessageCircle, Users, Plus, Sparkles, Search, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(17);
  const [showPeriodDialog, setShowPeriodDialog] = useState(false);
  const [aiPermissionEnabled, setAiPermissionEnabled] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingType, setLoadingType] = useState<'period' | 'symptoms' | 'general'>('general');
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Cycle data state to track period days, symptoms, sex activities, etc.
  const [cycleData, setCycleData] = useState<{[key: string]: {
    isPeriod?: boolean;
    flow?: 'light' | 'medium' | 'heavy';
    symptoms?: string[];
    hasSex?: boolean;
    notes?: string;
  }}>({});

  if (!hasSeenIntro) {
    return <Introduction onComplete={() => setHasSeenIntro(true)} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  if (!isSetupComplete) {
    return <ProfileSetup onSetupComplete={() => setIsSetupComplete(true)} />;
  }

  const getCurrentPhase = () => {
    return { name: 'ovulation', emoji: '✨', dayLabel: 'Day of ovulation' };
  };

  const currentPhase = getCurrentPhase();
  
  const getCyclePhaseBackground = () => {
    const phase = currentPhase.name;
    switch (phase) {
      case 'period':
        return 'bg-gradient-to-b from-red-100 to-red-200';
      case 'fertile':
        return 'bg-gradient-to-b from-green-100 to-green-200';
      case 'ovulation':
        return 'bg-gradient-to-b from-teal-100 to-teal-200';
      case 'pms':
        return 'bg-gradient-to-b from-orange-100 to-orange-200';
      default:
        return 'bg-gradient-to-b from-teal-100 to-teal-200';
    }
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setShowPeriodDialog(true);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleLogPeriod = () => {
    // Redirect to track page instead of showing popup
    setActiveTab('track');
  };

  const handleTrackSave = (data: any) => {
    setLoadingType('symptoms');
    setLoadingMessage('Saving your beautiful symptoms and updating your cycle data...');
    setShowLoadingAnimation(true);
    
    // Update cycle data
    const today = new Date();
    const dayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    setCycleData(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        ...data,
        isPeriod: data.flow ? true : prev[dayKey]?.isPeriod || false
      }
    }));
    
    // Simulate API call
    setTimeout(() => {
      setShowLoadingAnimation(false);
      console.log('Saved tracking data:', data);
    }, 3000);
  };

  const handlePeriodUpdate = (action: string) => {
    setShowPeriodDialog(false);
    setLoadingType('period');
    setLoadingMessage('Updating your cycle data and recalculating predictions...');
    setShowLoadingAnimation(true);
    
    const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`;
    setCycleData(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        isPeriod: action === 'started',
        flow: action === 'started' ? 'medium' : undefined
      }
    }));
    
    // Simulate API call
    setTimeout(() => {
      setShowLoadingAnimation(false);
      console.log(`Period ${action} for ${selectedDate}`);
    }, 2500);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDayPhase = (dayNumber: number) => {
    // Mock cycle data based on day of month
    if (dayNumber >= 1 && dayNumber <= 5) return 'period';
    if (dayNumber >= 10 && dayNumber <= 16) return 'fertile';
    if (dayNumber === 14) return 'ovulation';
    if (dayNumber >= 12 && dayNumber <= 16) return 'high-pregnancy';
    if (dayNumber >= 22 && dayNumber <= 28) return 'pms';
    return 'normal';
  };

  const getDayColor = (dayNumber: number, phase: string) => {
    switch (phase) {
      case 'period':
        return 'text-red-600 font-bold';
      case 'fertile':
        return 'text-green-600 font-bold';
      case 'ovulation':
        return 'text-blue-600 font-bold';
      case 'high-pregnancy':
        return 'text-green-600 font-bold';
      case 'pms':
        return 'text-orange-600 font-bold';
      default:
        return 'text-gray-700';
    }
  };

  const getDayBackground = (phase: string) => {
    switch (phase) {
      case 'period':
        return 'from-red-100 to-red-200';
      case 'fertile':
        return 'from-green-100 to-green-200';
      case 'ovulation':
        return 'from-blue-100 to-blue-200';
      case 'high-pregnancy':
        return 'from-green-100 to-green-200';
      case 'pms':
        return 'from-orange-100 to-orange-200';
      default:
        return 'from-teal-100 to-teal-200';
    }
  };

  // Generate calendar days synced with current month
  const generateCalendarDaysForCurrentMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    // Get the first day of the month and calculate which day of week it starts on
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Calculate the first date to show (might be from previous month)
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - startDayOfWeek);
    
    const days = [];
    
    // Generate 7 days starting from the calculated start date
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      
      const isToday = today.getDate() === currentDay.getDate() && 
                     today.getMonth() === currentDay.getMonth() && 
                     today.getFullYear() === currentDay.getFullYear();

      const isCurrentMonth = currentDay.getMonth() === month;
      const phase = getDayPhase(currentDay.getDate());
      const dayKey = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
      const dayData = cycleData[dayKey];
      
      days.push({
        number: currentDay.getDate(),
        isSelected: currentDay.getDate() === selectedDate && isCurrentMonth,
        isToday,
        isCurrentMonth,
        phase,
        isPeriod: dayData?.isPeriod || phase === 'period',
        hasSex: dayData?.hasSex || false,
        isHighPregnancy: phase === 'high-pregnancy',
        isOvulation: phase === 'ovulation'
      });
    }
    
    return days;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-0 animate-fade-in">
            {/* FLO-style Calendar Header with dynamic background */}
            <div className={`bg-gradient-to-b ${getDayBackground(getCurrentPhase().name)} rounded-b-3xl px-4 pt-8 pb-6 mb-6 animate-slide-up`}>
              <div className="flex items-center justify-between mb-4">
                {/* User Settings on the left */}
                <UserSettings 
                  onAIPermissionChange={setAiPermissionEnabled}
                  aiPermissionEnabled={aiPermissionEnabled}
                />
                
                {/* Centered Month Navigation */}
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => changeMonth('prev')}
                    className="text-gray-700 hover:bg-white/20 hover-lift"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-700 font-medium text-lg min-w-[120px] text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => changeMonth('next')}
                    className="text-gray-700 hover:bg-white/20 hover-lift"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Calendar icon on the right */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCalendar(true)}
                  className="text-gray-700 hover:bg-white/20 hover-lift w-8 h-8 p-0 rounded-full"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Week View - Now properly synced with colors and symbols */}
              <div className="flex justify-between items-center mb-6">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                  const calendarDays = generateCalendarDaysForCurrentMonth();
                  const dayData = calendarDays[index];
                  const isSelected = dayData?.isSelected;
                  const isCurrentMonth = dayData?.isCurrentMonth;
                  const phase = dayData?.phase;
                  const isToday = dayData?.isToday;
                  return (
                    <div key={index} className="text-center relative">
                      <div className="text-xs text-gray-600 mb-2">{day}</div>
                      <button
                        onClick={() => handleDateClick(dayData?.number || 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover-lift relative ${
                          isToday 
                            ? 'bg-white text-teal-600 shadow-lg ring-2 ring-teal-400 ring-offset-2 animate-pulse-soft' 
                            : isSelected 
                            ? 'bg-white text-teal-600 shadow-sm animate-bounce-gentle' 
                            : isCurrentMonth
                            ? `${getDayColor(dayData?.number || 1, phase || 'normal')} hover:bg-white/50`
                            : 'text-gray-400 hover:bg-white/30'
                        }`}
                      >
                        {dayData?.number || 1}
                        
                        {/* High pregnancy chance indicator - specialized circle */}
                        {dayData?.isHighPregnancy && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-green-500 rounded-full bg-transparent animate-pulse">
                            <div className="absolute inset-0.5 bg-green-500 rounded-full opacity-60"></div>
                          </div>
                        )}
                        
                        {/* Ovulation indicator - specialized circle */}
                        {dayData?.isOvulation && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-blue-500 rounded-full bg-transparent animate-pulse">
                            <div className="absolute inset-0.5 bg-blue-500 rounded-full opacity-60"></div>
                          </div>
                        )}
                        
                        {/* Sex activity indicator - heart symbol */}
                        {dayData?.hasSex && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Prediction Section */}
              <div className="text-center animate-scale-in">
                <p className="text-gray-700 text-sm font-medium mb-2">Prediction:</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in">{currentPhase.dayLabel}</h2>
                <Button 
                  onClick={handleLogPeriod}
                  className="bg-white text-teal-600 hover:bg-gray-50 rounded-full px-6 py-2 font-medium shadow-sm hover-lift animate-glow"
                >
                  Log period
                </Button>
              </div>
            </div>

            {/* Daily Insights Section */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 animate-fade-in">My daily insights • Today</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Log Symptoms Card */}
                <Card 
                  className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 rounded-2xl cursor-pointer card-hover animate-slide-up"
                  style={{ animationDelay: '0.1s' }}
                  onClick={() => setActiveTab('track')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2 animate-float">📝</div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Log your</p>
                    <p className="text-sm font-medium text-gray-800">symptoms</p>
                    <div className="mt-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto animate-pulse-soft">
                        <Plus className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Discharge Card */}
                <Card 
                  className="bg-gradient-to-br from-purple-400 to-pink-500 border-0 rounded-2xl text-white cursor-pointer card-hover animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2 animate-float">💜</div>
                    <p className="text-sm font-medium mb-1">Discharge</p>
                    <p className="text-xs opacity-90 mb-2">See frequency for pregnancy</p>
                    <div className="text-lg font-bold">Egg white</div>
                  </CardContent>
                </Card>
              </div>

              {/* Ovulation Signals */}
              <Card className="bg-white border-0 rounded-2xl shadow-sm mb-6 card-hover animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 animate-fade-in">Spot the signals of ovulation</h4>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover-lift">
                    <Search className="h-5 w-5 text-gray-400 animate-pulse-soft" />
                    <span className="text-gray-500 text-sm">Search articles, videos and more</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Grid - Only AI Chat and Premium */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card 
                  className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
                  style={{ animationDelay: '0.4s' }}
                  onClick={() => setActiveTab('chat')}
                >
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-6 w-6 text-blue-500 mx-auto mb-2 animate-bounce-gentle" />
                    <p className="text-xs font-medium text-gray-700">AI Chat</p>
                  </CardContent>
                </Card>

                <Card 
                  className="bg-white border-0 rounded-2xl shadow-sm card-hover cursor-pointer animate-slide-up"
                  style={{ animationDelay: '0.5s' }}
                  onClick={() => setActiveTab('premium')}
                >
                  <CardContent className="p-4 text-center">
                    <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2 animate-bounce-gentle" />
                    <p className="text-xs font-medium text-gray-700">Premium</p>
                  </CardContent>
                </Card>
              </div>

              <CycleInsights />
            </div>
          </div>
        );
      
      case 'track':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="pt-6">
              {/* Centered Track Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg mb-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Track</h2>
                <p className="text-gray-600 text-sm">Log symptoms and daily observations</p>
              </div>
            </div>
            <EnhancedSymptomTracker />
          </div>
        );
      
      case 'chat':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="pt-6">
              {/* Centered AI Chat Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg mb-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">AI Assistant</h2>
                <p className="text-gray-600 text-sm">Your personal health companion</p>
              </div>
            </div>
            <AIAssistant />
          </div>
        );

      case 'partner':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="pt-6">
              {/* Centered Partner Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full shadow-lg mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Partner</h2>
                <p className="text-gray-600 text-sm">Share your journey together</p>
              </div>
            </div>
            <PartnerConnection />
          </div>
        );

      case 'premium':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="pt-6">
              {/* Centered Premium Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Premium</h2>
                <p className="text-gray-600 text-sm">Unlock advanced features</p>
              </div>
            </div>
            <Subscription />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="relative max-w-md mx-auto bg-white min-h-screen">
        <div className="pb-24">
          {renderContent()}
        </div>
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Calendar Modal - Full Calendar View */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="h-full overflow-y-auto p-4">
            <div className="max-w-md mx-auto">
              <EnhancedCycleCalendar 
                showAIChat={aiPermissionEnabled}
                aiPermissionEnabled={aiPermissionEnabled}
                onClose={() => setShowCalendar(false)}
                cycleData={cycleData}
                onCycleDataUpdate={setCycleData}
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {showLoadingAnimation && (
        <LoadingAnimation 
          message={loadingMessage}
          type={loadingType}
        />
      )}

      {/* Period Edit Dialog */}
      <Dialog open={showPeriodDialog} onOpenChange={setShowPeriodDialog}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold flex items-center justify-center gap-2">
              <span className="text-2xl">🩸</span>
              Edit Period for {monthNames[currentDate.getMonth()]} {selectedDate}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Did you have your period on this day?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-3"
                  onClick={() => handlePeriodUpdate('started')}
                >
                  <span className="text-lg mr-2">🩸</span>
                  Yes, period started
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-xl py-3"
                  onClick={() => handlePeriodUpdate('no period')}
                >
                  <span className="text-lg mr-2">❌</span>
                  No period
                </Button>
              </div>
              <Button 
                variant="ghost"
                className="mt-3 w-full rounded-xl"
                onClick={() => {
                  setShowPeriodDialog(false);
                  setActiveTab('track');
                }}
              >
                <span className="text-lg mr-2">📝</span>
                Log symptoms instead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
