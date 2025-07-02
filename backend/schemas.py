
from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from models import FlowIntensity, SymptomType, CervicalFluid

# User schemas
class UserBase(BaseModel):
    email: str
    username: str
    full_name: Optional[str] = None
    date_of_birth: Optional[date] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[date] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Cycle schemas
class CycleBase(BaseModel):
    start_date: date
    end_date: Optional[date] = None
    cycle_length: Optional[int] = None
    flow_intensity: Optional[FlowIntensity] = None
    notes: Optional[str] = None

class CycleCreate(CycleBase):
    pass

class CycleResponse(CycleBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Symptom schemas
class SymptomBase(BaseModel):
    date: date
    symptom_type: SymptomType
    severity: Optional[int] = None
    notes: Optional[str] = None

class SymptomCreate(SymptomBase):
    pass

class SymptomResponse(SymptomBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Ovulation schemas
class OvulationBase(BaseModel):
    date: date
    basal_temp: Optional[float] = None
    cervical_fluid: Optional[CervicalFluid] = None
    ovulation_test: Optional[bool] = None
    notes: Optional[str] = None

class OvulationCreate(OvulationBase):
    pass

class OvulationResponse(OvulationBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# AI and misc schemas
class ChatMessage(BaseModel):
    message: str

class NotificationSetup(BaseModel):
    period_reminder: bool = True
    ovulation_reminder: bool = True
    cycle_insights: bool = True
    reminder_days_before: int = 2
