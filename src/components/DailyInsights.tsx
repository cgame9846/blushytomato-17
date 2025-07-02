
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CycleInsights from '@/components/CycleInsights';
import { Plus, Search } from 'lucide-react';

interface DailyInsightsProps {
  onTrackClick: () => void;
}

const DailyInsights = ({ onTrackClick }: DailyInsightsProps) => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 animate-fade-in">My daily insights • Today</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 rounded-2xl cursor-pointer card-hover animate-slide-up"
          style={{ animationDelay: '0.1s' }}
          onClick={onTrackClick}
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

      <Card className="bg-white border-0 rounded-2xl shadow-sm mb-6 card-hover animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 animate-fade-in">Spot the signals of ovulation</h4>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover-lift">
            <Search className="h-5 w-5 text-gray-400 animate-pulse-soft" />
            <span className="text-gray-500 text-sm">Search articles, videos and more</span>
          </div>
        </CardContent>
      </Card>

      <CycleInsights />
    </div>
  );
};

export default DailyInsights;
