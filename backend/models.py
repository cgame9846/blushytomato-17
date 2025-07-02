
from sqlalchemy import Column, Integer, String, DateTime, Date, Float, Boolean, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class FlowIntensity(enum.Enum):
    LIGHT = "light"
    MEDIUM = "medium"
    HEAVY = "heavy"

class SymptomType(enum.Enum):
    CRAMPS = "cramps"
    HEADACHE = "headache"
    MOOD_SWING = "mood_swing"
    BLOATING = "bloating"
    BREAST_TENDERNESS = "breast_tenderness"
    FATIGUE = "fatigue"
    NAUSEA = "nausea"
    ACNE = "acne"
    BACK_PAIN = "back_pain"
    OTHER = "other"

class CervicalFluid(enum.Enum):
    DRY = "dry"
    STICKY = "sticky"
    CREAMY = "creamy"
    WATERY = "watery"
    EGG_WHITE = "egg_white"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    date_of_birth = Column(Date)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    cycles = relationship("Cycle", back_populates="user")
    symptoms = relationship("Symptom", back_populates="user")
    ovulation_records = relationship("Ovulation", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class Cycle(Base):
    __tablename__ = "cycles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    cycle_length = Column(Integer)
    flow_intensity = Column(Enum(FlowIntensity))
    notes = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="cycles")

class Symptom(Base):
    __tablename__ = "symptoms"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, nullable=False)
    symptom_type = Column(Enum(SymptomType), nullable=False)
    severity = Column(Integer)  # 1-10 scale
    notes = Column(Text)
    created_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="symptoms")

class Ovulation(Base):
    __tablename__ = "ovulation"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, nullable=False)
    basal_temp = Column(Float)
    cervical_fluid = Column(Enum(CervicalFluid))
    ovulation_test = Column(Boolean)
    notes = Column(Text)
    created_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="ovulation_records")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    notification_type = Column(String, nullable=False)  # period_reminder, ovulation_reminder, etc.
    message = Column(Text)
    scheduled_date = Column(DateTime)
    sent = Column(Boolean, default=False)
    created_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="notifications")
