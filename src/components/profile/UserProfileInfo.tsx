
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Edit } from 'lucide-react';

interface UserProfileInfoProps {
  userName: string;
  onNameUpdate: (newName: string) => void;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ userName, onNameUpdate }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState('user@example.com');

  const handleSave = () => {
    onNameUpdate(editName);
    setShowEditDialog(false);
  };

  return (
    <Card className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-0 rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{userName}</h3>
              <p className="text-sm text-gray-600">Tracking your health journey</p>
            </div>
          </div>
          
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Edit className="h-4 w-4 text-gray-600" />
              </Button>
            </DialogTrigger>
            
            <DialogContent className="w-[95vw] max-w-md mx-auto rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">Edit Profile</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowEditDialog(false)}
                    variant="outline"
                    className="flex-1 rounded-2xl py-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 rounded-2xl py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileInfo;
