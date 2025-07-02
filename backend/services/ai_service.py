
import asyncio
import json
from datetime import datetime, timedelta
from typing import List, Dict
from sqlalchemy.orm import Session
import models
import httpx
import os

class AIService:
    def __init__(self):
        self.api_key = "AIzaSyC_FBJ2fYhqzPNX5LLRDM4wRtiD2A7ikGY"
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    
    async def generate_cycle_insights(self, user_id: int, db: Session) -> Dict:
        """Generate AI-powered cycle insights for a user"""
        try:
            # Get user's cycle data
            user_data = self._get_user_cycle_data(user_id, db)
            
            prompt = f"""
            Analyze the following menstrual cycle data and provide health insights:
            
            User Data: {json.dumps(user_data, default=str)}
            
            Please provide:
            1. Cycle regularity analysis
            2. Symptom patterns
            3. Fertility window predictions
            4. Health recommendations
            5. Any concerns to discuss with healthcare provider
            
            Keep the response supportive, informative, and medically accurate.
            """
            
            response = await self._call_gemini_api(prompt)
            
            return {
                "insights": response,
                "generated_at": datetime.utcnow(),
                "data_period": f"Last 6 months"
            }
        except Exception as e:
            return {
                "error": f"Unable to generate insights: {str(e)}",
                "insights": "Please ensure you have logged enough cycle data for meaningful analysis."
            }
    
    async def chat_with_ai(self, message: str, user_id: int, db: Session) -> str:
        """Chat with AI about period-related topics"""
        try:
            # Get user context
            user_data = self._get_user_cycle_data(user_id, db)
            
            prompt = f"""
            You are a knowledgeable and supportive AI assistant for menstrual health. 
            The user is asking: "{message}"
            
            Context about the user's recent cycle data: {json.dumps(user_data, default=str)}
            
            Please provide a helpful, accurate, and supportive response. 
            Always recommend consulting healthcare providers for medical concerns.
            Keep the tone warm and understanding.
            """
            
            response = await self._call_gemini_api(prompt)
            return response
        except Exception as e:
            return f"I'm sorry, I'm having trouble responding right now. Please try again later. Error: {str(e)}"
    
    def _get_user_cycle_data(self, user_id: int, db: Session) -> Dict:
        """Get user's recent cycle data for AI analysis"""
        six_months_ago = datetime.utcnow().date() - timedelta(days=180)
        
        # Get recent cycles
        cycles = db.query(models.Cycle).filter(
            models.Cycle.user_id == user_id,
            models.Cycle.start_date >= six_months_ago
        ).order_by(models.Cycle.start_date.desc()).limit(6).all()
        
        # Get recent symptoms
        symptoms = db.query(models.Symptom).filter(
            models.Symptom.user_id == user_id,
            models.Symptom.date >= six_months_ago
        ).order_by(models.Symptom.date.desc()).limit(50).all()
        
        # Get recent ovulation data
        ovulation = db.query(models.Ovulation).filter(
            models.Ovulation.user_id == user_id,
            models.Ovulation.date >= six_months_ago
        ).order_by(models.Ovulation.date.desc()).limit(20).all()
        
        return {
            "cycles": [
                {
                    "start_date": cycle.start_date,
                    "end_date": cycle.end_date,
                    "cycle_length": cycle.cycle_length,
                    "flow_intensity": cycle.flow_intensity.value if cycle.flow_intensity else None
                } for cycle in cycles
            ],
            "symptoms": [
                {
                    "date": symptom.date,
                    "type": symptom.symptom_type.value,
                    "severity": symptom.severity
                } for symptom in symptoms
            ],
            "ovulation": [
                {
                    "date": ov.date,
                    "basal_temp": ov.basal_temp,
                    "cervical_fluid": ov.cervical_fluid.value if ov.cervical_fluid else None,
                    "ovulation_test": ov.ovulation_test
                } for ov in ovulation
            ]
        }
    
    async def _call_gemini_api(self, prompt: str) -> str:
        """Call Google Gemini API"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}?key={self.api_key}",
                    json={
                        "contents": [{
                            "parts": [{
                                "text": prompt
                            }]
                        }]
                    },
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response generated")
                else:
                    return f"API Error: {response.status_code}"
        except Exception as e:
            return f"Error calling AI service: {str(e)}"
