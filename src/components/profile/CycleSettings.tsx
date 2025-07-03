
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface CycleSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CycleSettings: React.FC<CycleSettingsProps> = ({ isOpen, onClose }) => {
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [lutealPhase, setLutealPhase] = useState('14');
  const [irregularCycle, setIrregularCycle] = useState(false);
  const [trackSymptoms, setTrackSymptoms] = useState(true);

  const handleSave = () => {
    // Save cycle settings
    console.log('Cycle settings saved:', {
      cycleLength,
      periodLength,
      lutealPhase,
      irregularCycle,
      trackSymptoms
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Cycle Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Card className="border-0 bg-gray-50 rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Average Cycle Length</Label>
                <Select value={cycleLength} onValueChange={setCycleLength}>
                  <SelectTrigger className="rounded-2xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 21).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Period Length</Label>
                <Select value={periodLength} onValueChange={setPeriodLength}>
                  <SelectTrigger className="rounded-2xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => i + 3).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Luteal Phase Length</Label>
                <Input
                  value={lutealPhase}
                  onChange={(e) => setLutealPhase(e.target.value)}
                  className="rounded-2xl h-12"
                  placeholder="14 days"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Irregular Cycle</Label>
                <p className="text-sm text-gray-600">My cycle length varies significantly</p>
              </div>
              <Switch
                checked={irregularCycle}
                onCheckedChange={setIrregularCycle}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Track Symptoms</Label>
                <p className="text-sm text-gray-600">Enable detailed symptom tracking</p>
              </div>
              <Switch
                checked={trackSymptoms}
                onCheckedChange={setTrackSymptoms}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-2xl py-3"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 rounded-2xl py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CycleSettings;
