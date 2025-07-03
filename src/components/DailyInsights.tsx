
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface DailyInsightsProps {
  onTrackClick: () => void;
}

const DailyInsights = ({ onTrackClick }: DailyInsightsProps) => {
  return (
    <div className="px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 animate-fade-in">My daily insights • Today</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <Card 
          className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 rounded-2xl cursor-pointer card-hover animate-slide-up"
          onClick={onTrackClick}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl mb-2 animate-float">📝</div>
            <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1">Log your</p>
            <p className="text-xs sm:text-sm font-medium text-gray-800">symptoms</p>
            <div className="mt-2 sm:mt-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center mx-auto animate-pulse-soft">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-purple-400 to-pink-500 border-0 rounded-2xl text-white cursor-pointer card-hover animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl mb-2 animate-float">💜</div>
            <p className="text-xs sm:text-sm font-medium mb-1">Discharge</p>
            <p className="text-xs opacity-90 mb-2">See frequency for pregnancy</p>
            <div className="text-sm sm:text-lg font-bold">Egg white</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyInsights;
