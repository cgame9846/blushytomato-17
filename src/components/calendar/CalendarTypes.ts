
export interface CalendarDay {
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

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface EnhancedCycleCalendarProps {
  showAIChat?: boolean;
  aiPermissionEnabled?: boolean;
  onClose?: () => void;
  cycleData?: {[key: string]: any};
  onCycleDataUpdate?: (data: {[key: string]: any}) => void;
  hasPeriodData?: boolean;
}
