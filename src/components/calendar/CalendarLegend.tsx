
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart } from 'lucide-react';

const CalendarLegend: React.FC = () => {
  return (
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
  );
};

export default CalendarLegend;
