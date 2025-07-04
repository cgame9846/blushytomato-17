
import React, { useState } from 'react';
import Introduction from '@/components/Introduction';
import Auth from './Auth';
import ProfileSetup from './ProfileSetup';
import EnhancedCycleCalendar from '@/components/EnhancedCycleCalendar';
import Navigation from '@/components/Navigation';
import LoadingAnimation from '@/components/LoadingAnimation';
import TabContent from '@/components/TabContent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [hasPeriodData, setHasPeriodData] = useState(false);
  
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
    setActiveTab('track');
  };

  const handleTrackSave = (data: any) => {
    setLoadingType('symptoms');
    setLoadingMessage('Saving your beautiful symptoms and updating your cycle data...');
    setShowLoadingAnimation(true);
    
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
    
    if (action === 'started') {
      setHasPeriodData(true);
    }
    
    setTimeout(() => {
      setShowLoadingAnimation(false);
      console.log(`Period ${action} for ${selectedDate}`);
    }, 2500);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="relative max-w-md mx-auto bg-white min-h-screen">
        <div className="pb-20 sm:pb-24">
          <TabContent
            activeTab={activeTab}
            currentDate={currentDate}
            selectedDate={selectedDate}
            currentPhase={currentPhase}
            aiPermissionEnabled={aiPermissionEnabled}
            hasPeriodData={hasPeriodData}
            cycleData={cycleData}
            onAIPermissionChange={setAiPermissionEnabled}
            onMonthChange={changeMonth}
            onCalendarOpen={() => setShowCalendar(true)}
            onLogPeriod={handleLogPeriod}
            onDateClick={handleDateClick}
            onTrackClick={() => setActiveTab('track')}
            onChatClick={() => setActiveTab('chat')}
            onPremiumClick={() => setActiveTab('premium')}
          />
        </div>
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Enhanced Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="h-full overflow-y-auto p-2 sm:p-4">
            <div className="max-w-md mx-auto">
              <EnhancedCycleCalendar 
                showAIChat={aiPermissionEnabled}
                aiPermissionEnabled={aiPermissionEnabled}
                onClose={() => setShowCalendar(false)}
                cycleData={cycleData}
                onCycleDataUpdate={setCycleData}
                hasPeriodData={hasPeriodData}
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
