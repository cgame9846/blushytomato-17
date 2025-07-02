
import { useState } from 'react';

export interface CycleDataEntry {
  isPeriod?: boolean;
  flow?: 'light' | 'medium' | 'heavy';
  symptoms?: string[];
  hasSex?: boolean;
  notes?: string;
}

export interface CycleData {
  [key: string]: CycleDataEntry;
}

export const useCycleData = () => {
  const [cycleData, setCycleData] = useState<CycleData>({});

  const updateCycleData = (dayKey: string, data: Partial<CycleDataEntry>) => {
    setCycleData(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        ...data
      }
    }));
  };

  const getDayPhase = (dayNumber: number) => {
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

  const getCurrentPhase = () => {
    return { name: 'ovulation', emoji: '✨', dayLabel: 'Day of ovulation' };
  };

  return {
    cycleData,
    setCycleData,
    updateCycleData,
    getDayPhase,
    getDayColor,
    getDayBackground,
    getCurrentPhase
  };
};
