import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Droplet, Bell, MessageCircle, X, Send, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isPeriod: boolean;
  isFertile: boolean;
  isPMS: boolean;
  isOvulation: boolean;
  isToday: boolean;
  flow?: 'light' | 'medium' | 'heavy';
  symptoms?: string[];
  notes?: string;
  isHighPregnancyChance?: boolean;
  hasSex?: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EnhancedCycleCalendarProps {
  showAIChat?: boolean;
  aiPermissionEnabled?: boolean;
  onClose?: () => void;
  cycleData?: {[key: string]: any};
  onCycleDataUpdate?: (data: {[key: string]: any}) => void;
}

const EnhancedCycleCalendar: React.FC<EnhancedCycleCalendarProps> = ({ 
  showAIChat = false,
  aiPermissionEnabled = false,
  onClose,
  cycleData = {},
  onCycleDataUpdate = () => {}
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'monthYear'>('calendar');
  const [showPeriodReminder, setShowPeriodReminder] = useState(true);
  const [showAIChatDialog, setShowAIChatDialog] = useState(false);
  const [showMonthYearSelector, setShowMonthYearSelector] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello beautiful! 💕 I'm your caring wellness companion, here to support you through every moment of your health journey. Think of me as your wise, loving friend who's always ready to listen and help. How are you feeling today, sweetie?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const symptoms = [
    'Cramps', 'Bloating', 'Headache', 'Mood swings', 'Fatigue', 
    'Breast tenderness', 'Acne', 'Back pain', 'Food cravings'
  ];

  const apiKey = 'AIzaSyBcF1oZBxu60O45ZfGD3f717fXa9EhoU0g';
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a warm, caring AI companion for a women's wellness app called Blushy Tomato. You're like a supportive best friend who understands periods, emotions, and women's health. Speak warmly, empathetically, and offer helpful advice. Use caring language with occasional emojis. Be supportive but not overly clinical. Always be encouraging and understanding.

User message: ${userMessage}

Please respond with warmth, empathy, and helpful advice in a caring, friendly tone.`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here for you, honey! Let me know how I can help support you today. 💕";
    } catch (error) {
      console.error('AI API Error:', error);
      return "I'm having a little trouble right now, but I'm still here for you! Try asking me again, sweetie. 💕";
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const aiResponse = await generateAIResponse(chatInput.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Something went wrong on my end, but remember - you're amazing and I'm here for you! Try asking me again. 💪💕",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleLogPeriod = () => {
    const today = new Date();
    const dayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    const updatedCycleData = {
      ...cycleData,
      [dayKey]: {
        date: today.getDate(),
        isCurrentMonth: true,
        isPeriod: true,
        isFertile: false,
        isPMS: false,
        isOvulation: false,
        isToday: true,
        flow: 'medium'
      }
    };
    
    onCycleDataUpdate(updatedCycleData);
    setShowPeriodReminder(false);
  };

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

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const dayKey = `${year}-${month-1}-${prevMonth.getDate() - i}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(prevMonth.getDate() - i);
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday: false,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const isToday = today.getDate() === date && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      
      const dayKey = `${year}-${month}-${date}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(date);
      
      days.push({
        date,
        isCurrentMonth: true,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      const dayKey = `${year}-${month+1}-${date}`;
      const savedData = cycleData[dayKey];
      const phase = getDayPhase(date);
      days.push({
        date,
        isCurrentMonth: false,
        isPeriod: savedData?.isPeriod || phase === 'period',
        isFertile: savedData?.isFertile || phase === 'fertile',
        isPMS: savedData?.isPMS || phase === 'pms',
        isOvulation: savedData?.isOvulation || phase === 'ovulation',
        isToday: false,
        isHighPregnancyChance: savedData?.isHighPregnancyChance || phase === 'high-pregnancy',
        hasSex: savedData?.hasSex || false,
        ...savedData
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsCalendarAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
        return newDate;
      });
      setIsCalendarAnimating(false);
    }, 150);
  };

  const handleMonthYearChange = (type: 'month' | 'year', value: string) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (type === 'month') {
        newDate.setMonth(parseInt(value));
      } else {
        newDate.setFullYear(parseInt(value));
      }
      return newDate;
    });
    setShowMonthYearSelector(false);
  };

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay({...day, date: day.date});
  };

  const saveDayData = (dayData: Partial<CalendarDay>) => {
    if (!selectedDay) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayKey = `${year}-${month}-${selectedDay.date}`;
    
    const updatedCycleData = {
      ...cycleData,
      [dayKey]: {
        ...cycleData[dayKey],
        ...selectedDay,
        ...dayData
      }
    };
    
    onCycleDataUpdate(updatedCycleData);
    setSelectedDay(null);
  };

  const getDayClassName = (day: CalendarDay) => {
    let className = "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer relative mx-auto hover:scale-105 ";
    
    if (!day.isCurrentMonth) {
      className += "text-gray-300 opacity-40 hover:opacity-60 ";
    } else {
      const phase = getDayPhase(day.date);
      className += getDayColor(day.date, phase) + " ";
    }
    
    if (day.isToday) {
      className += "ring-2 ring-rose-400 ring-offset-1 font-bold animate-pulse-soft ";
    }
    
    // Only period days get red background
    if (day.isPeriod) {
      className += "bg-red-500 text-white shadow-md ";
    } else {
      className += "hover:bg-gray-100 ";
    }
    
    return className;
  };

  const calendarDays = generateCalendarDays();

  // Month/Year Selection View
  if (viewMode === 'monthYear') {
    return (
      <div className="animate-fade-in">
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
          <CardHeader className="pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('calendar')}
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
                  onValueChange={(value) => handleMonthYearChange('month', value)}
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
                  onValueChange={(value) => handleMonthYearChange('year', value)}
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
              onClick={() => setViewMode('calendar')}
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-slide-up"
              style={{animationDelay: '0.2s'}}
            >
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* Close button for modal */}
      {onClose && (
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-600 hover:text-rose-600"
          >
            ← Back to Home
          </Button>
        </div>
      )}

      {/* Month/Year Toggle Button */}
      <div className="text-center mb-6">
        <Button
          variant="outline"
          onClick={() => setShowMonthYearSelector(!showMonthYearSelector)}
          className="text-lg font-bold text-gray-800 hover:text-rose-600 transition-colors border-gray-200 hover:border-rose-300 px-6 py-3 rounded-2xl"
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Month/Year Selector Dropdown */}
      {showMonthYearSelector && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowMonthYearSelector(false)}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent text-center">
                  Select Date
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Month</Label>
                    <Select
                      value={currentDate.getMonth().toString()}
                      onValueChange={(value) => handleMonthYearChange('month', value)}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300">
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
                  
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Year</Label>
                    <Select
                      value={currentDate.getFullYear().toString()}
                      onValueChange={(value) => handleMonthYearChange('year', value)}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300">
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
                  onClick={() => setShowMonthYearSelector(false)}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Done
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* AI Chat Toggle Button - Only show if permission enabled */}
      {aiPermissionEnabled && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowAIChatDialog(!showAIChatDialog)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 animate-float"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* AI Chat Window - Enhanced Messenger Style */}
      {showAIChatDialog && aiPermissionEnabled && (
        <div className="fixed inset-0 z-40 flex items-end justify-center p-4 bg-black/40 backdrop-blur-lg animate-fade-in">
          <div className="w-full max-w-md h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-soft">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">Your AI Companion</h3>
                <p className="text-sm text-gray-500">Always here for you 💕</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChatDialog(false)}
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white via-rose-50/20 to-pink-50/30">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-3xl text-sm shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-br-lg'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-lg'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white p-4 rounded-3xl rounded-bl-lg border border-gray-100 shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <Input
                  placeholder="How are you feeling today, sweetie?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  disabled={isChatLoading}
                  className="flex-1 rounded-full border-2 border-gray-100 focus:border-rose-300 px-6 py-3 transition-all duration-300"
                />
                <Button
                  onClick={handleChatSend}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Period Reminder */}
      {showPeriodReminder && (
        <Card className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 border-0 shadow-xl rounded-3xl animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-full shadow-lg animate-pulse-soft">
                  <Bell className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Period starts in 5 days</p>
                  <p className="text-sm text-gray-600">Low chance of pregnancy</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  onClick={handleLogPeriod}
                  className="h-12 text-sm bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-full px-6 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Log Period
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-12 w-12 p-0 rounded-full hover:bg-white/80 transition-all duration-300"
                  onClick={() => setShowPeriodReminder(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Calendar */}
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-14 w-14 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </Button>
            
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Calendar View
            </CardTitle>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-14 w-14 p-0 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-10">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-bold text-gray-400 py-4">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid - NO dotted circles */}
          <div className={`grid grid-cols-7 gap-3 mb-8 transition-all duration-300 ${isCalendarAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {calendarDays.map((day, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div 
                    className={getDayClassName(day)}
                    onClick={() => handleDayClick(day)}
                    style={{animationDelay: `${index * 0.01}s`}}
                  >
                    <span>{day.date}</span>
                    {/* Sex activity indicator - heart symbol */}
                    {day.hasSex && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-2xl animate-scale-in">
                  <DialogHeader className="pb-8">
                    <DialogTitle className="flex items-center gap-4 text-2xl">
                      <div className="p-4 bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 rounded-full">
                        <CalendarIcon className="h-8 w-8 text-rose-600" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">
                          {monthNames[currentDate.getMonth()]} {day.date}
                        </div>
                        <div className="text-sm text-gray-500 font-normal">
                          How are you feeling?
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <Droplet className="h-5 w-5 text-rose-500" />
                        Period Status
                      </Label>
                      <div className="flex gap-3">
                        <Button
                          variant={day.isPeriod ? "default" : "outline"}
                          size="sm"
                          onClick={() => saveDayData({ isPeriod: !day.isPeriod })}
                          className={`rounded-full transition-all duration-300 ${day.isPeriod ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md'}`}
                        >
                          <Droplet className="h-4 w-4 mr-2" />
                          Period Day
                        </Button>
                        {day.isPeriod && (
                          <div className="flex gap-2 animate-slide-up">
                            {['light', 'medium', 'heavy'].map(flow => (
                              <Button
                                key={flow}
                                variant={day.flow === flow ? "default" : "outline"}
                                size="sm"
                                className={`text-xs rounded-full capitalize transition-all duration-300 ${
                                  day.flow === flow ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md'
                                }`}
                                onClick={() => saveDayData({ flow: flow as 'light' | 'medium' | 'heavy' })}
                              >
                                {flow}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-rose-500" />
                        Symptoms
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {symptoms.map(symptom => (
                          <Button
                            key={symptom}
                            variant={day.symptoms?.includes(symptom) ? "default" : "outline"}
                            size="sm"
                            className={`text-sm h-auto py-4 rounded-2xl transition-all duration-300 ${
                              day.symptoms?.includes(symptom) ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg' : 'hover:shadow-md hover:scale-105'
                            }`}
                            onClick={() => {
                              const currentSymptoms = day.symptoms || [];
                              const newSymptoms = currentSymptoms.includes(symptom)
                                ? currentSymptoms.filter(s => s !== symptom)
                                : [...currentSymptoms, symptom];
                              saveDayData({ symptoms: newSymptoms });
                            }}
                          >
                            {symptom}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="notes" className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-rose-500" />
                        Daily Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="How are you feeling today? Any thoughts or reflections..."
                        value={day.notes || ''}
                        onChange={(e) => saveDayData({ notes: e.target.value })}
                        className="text-sm rounded-2xl border-2 border-gray-100 resize-none focus:border-rose-300 transition-all duration-300 p-4"
                        rows={4}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {/* Improved Cycle Legend */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-500" />
              Understanding Your Cycle
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Period Phase */}
              <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-100 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 shadow-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">P</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-red-700">Period (Days 1-5)</h4>
                      <p className="text-sm text-red-600">Menstrual flow - lowest chance of pregnancy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fertile Window */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-700">Fertile Window (Days 10-16)</h4>
                      <p className="text-sm text-green-600">Higher chance of pregnancy - body preparing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ovulation */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">O</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-700">Ovulation (Day 14)</h4>
                      <p className="text-sm text-blue-600">Peak fertility - egg is released</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PMS Phase */}
              <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 shadow-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">PMS</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-orange-700">PMS (Days 22-28)</h4>
                      <p className="text-sm text-orange-600">Pre-menstrual phase - symptoms may occur</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Symbol Legend */}
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100 rounded-2xl mt-4">
              <CardContent className="p-4">
                <h4 className="font-bold text-gray-700 mb-3">Symbols Guide</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span className="text-sm text-gray-600">Sexual activity recorded</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Period day confirmed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCycleCalendar;
