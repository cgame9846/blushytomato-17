
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from datetime import datetime, timedelta
from typing import Optional, List
import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import get_db, engine
import models
import schemas
from services.ai_service import AIService
from services.cycle_service import CycleService
from services.notification_service import NotificationService
import logging

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Period Tracker API",
    description="Self-hosted period tracking application with AI insights",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"

# Services
ai_service = AIService()
cycle_service = CycleService()
notification_service = NotificationService()

# Utility functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user = db.query(models.User).filter(models.User.email == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# Authentication endpoints
@app.post("/auth/register", response_model=schemas.UserResponse)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    hashed_password = hash_password(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
        full_name=user.full_name,
        date_of_birth=user.date_of_birth,
        created_at=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@app.post("/auth/login", response_model=schemas.Token)
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token_expires = timedelta(days=30)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User profile endpoints
@app.get("/user/profile", response_model=schemas.UserResponse)
async def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.put("/user/profile", response_model=schemas.UserResponse)
async def update_profile(user_update: schemas.UserUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(current_user, field, value)
    
    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)
    return current_user

# Cycle tracking endpoints
@app.post("/cycles", response_model=schemas.CycleResponse)
async def create_cycle(cycle: schemas.CycleCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_cycle = models.Cycle(
        user_id=current_user.id,
        start_date=cycle.start_date,
        end_date=cycle.end_date,
        cycle_length=cycle.cycle_length,
        flow_intensity=cycle.flow_intensity,
        notes=cycle.notes,
        created_at=datetime.utcnow()
    )
    db.add(db_cycle)
    db.commit()
    db.refresh(db_cycle)
    return db_cycle

@app.get("/cycles", response_model=List[schemas.CycleResponse])
async def get_cycles(skip: int = 0, limit: int = 100, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    cycles = db.query(models.Cycle).filter(models.Cycle.user_id == current_user.id).offset(skip).limit(limit).all()
    return cycles

@app.get("/cycles/{cycle_id}", response_model=schemas.CycleResponse)
async def get_cycle(cycle_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    cycle = db.query(models.Cycle).filter(models.Cycle.id == cycle_id, models.Cycle.user_id == current_user.id).first()
    if not cycle:
        raise HTTPException(status_code=404, detail="Cycle not found")
    return cycle

# Symptom tracking endpoints
@app.post("/symptoms", response_model=schemas.SymptomResponse)
async def create_symptom(symptom: schemas.SymptomCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_symptom = models.Symptom(
        user_id=current_user.id,
        date=symptom.date,
        symptom_type=symptom.symptom_type,
        severity=symptom.severity,
        notes=symptom.notes,
        created_at=datetime.utcnow()
    )
    db.add(db_symptom)
    db.commit()
    db.refresh(db_symptom)
    return db_symptom

@app.get("/symptoms", response_model=List[schemas.SymptomResponse])
async def get_symptoms(skip: int = 0, limit: int = 100, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    symptoms = db.query(models.Symptom).filter(models.Symptom.user_id == current_user.id).offset(skip).limit(limit).all()
    return symptoms

# Ovulation tracking endpoints
@app.post("/ovulation", response_model=schemas.OvulationResponse)
async def create_ovulation_record(ovulation: schemas.OvulationCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_ovulation = models.Ovulation(
        user_id=current_user.id,
        date=ovulation.date,
        basal_temp=ovulation.basal_temp,
        cervical_fluid=ovulation.cervical_fluid,
        ovulation_test=ovulation.ovulation_test,
        notes=ovulation.notes,
        created_at=datetime.utcnow()
    )
    db.add(db_ovulation)
    db.commit()
    db.refresh(db_ovulation)
    return db_ovulation

@app.get("/ovulation", response_model=List[schemas.OvulationResponse])
async def get_ovulation_records(skip: int = 0, limit: int = 100, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    ovulation_records = db.query(models.Ovulation).filter(models.Ovulation.user_id == current_user.id).offset(skip).limit(limit).all()
    return ovulation_records

# Predictions and insights
@app.get("/predictions/next-period")
async def predict_next_period(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    prediction = cycle_service.predict_next_period(current_user.id, db)
    return prediction

@app.get("/predictions/ovulation")
async def predict_ovulation(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    prediction = cycle_service.predict_ovulation(current_user.id, db)
    return prediction

@app.get("/insights/cycle-analysis")
async def get_cycle_insights(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    insights = await ai_service.generate_cycle_insights(current_user.id, db)
    return insights

# AI Chat endpoint
@app.post("/ai/chat")
async def ai_chat(message: schemas.ChatMessage, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    response = await ai_service.chat_with_ai(message.message, current_user.id, db)
    return {"response": response}

# Notifications and reminders
@app.post("/notifications/setup")
async def setup_notifications(notification: schemas.NotificationSetup, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = notification_service.setup_user_notifications(current_user.id, notification, db)
    return result

@app.get("/notifications/check")
async def check_notifications(db: Session = Depends(get_db)):
    """Endpoint to be called by cron job for checking notifications"""
    result = notification_service.check_and_send_notifications(db)
    return result

# File upload endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    # Save file
    file_path = f"uploads/{current_user.id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return {"filename": file.filename, "url": f"/uploads/{current_user.id}_{file.filename}"}

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
