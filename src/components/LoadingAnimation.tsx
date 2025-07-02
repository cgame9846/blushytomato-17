
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Heart, Sparkles } from 'lucide-react';

interface LoadingAnimationProps {
  message?: string;
  type?: 'period' | 'symptoms' | 'general';
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  message = "Updating your data...", 
  type = 'general' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'period':
        return <Droplets className="h-6 w-6 text-rose-500" />;
      case 'symptoms':
        return <Heart className="h-6 w-6 text-pink-500" />;
      default:
        return <Sparkles className="h-6 w-6 text-purple-500" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'period':
        return 'from-rose-100 via-red-100 to-pink-100';
      case 'symptoms':
        return 'from-pink-100 via-rose-100 to-purple-100';
      default:
        return 'from-purple-100 via-pink-100 to-rose-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <Card className={`w-80 border-0 shadow-2xl rounded-3xl bg-gradient-to-r ${getGradient()} animate-scale-in`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Tomato with rotating ring */}
              <div className="w-20 h-20 relative">
                {/* Rotating ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-rose-400 border-r-pink-400 rounded-full animate-spin"></div>
                
                {/* Tomato center */}
                <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-2xl">🍅</div>
                </div>
              </div>
              
              {/* Inner icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-soft mt-12">
                  {getIcon()}
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 animate-fade-in">
            {type === 'period' ? 'Updating Period Data' : 
             type === 'symptoms' ? 'Saving Your Beautiful Data' : 
             'Processing...'}
          </h3>
          
          <p className="text-gray-600 text-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
            {message}
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAnimation;
