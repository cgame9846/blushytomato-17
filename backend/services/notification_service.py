
from datetime import datetime, timedelta
from typing import Dict, List
from sqlalchemy.orm import Session
import models
import logging

class NotificationService:
    def setup_user_notifications(self, user_id: int, notification_setup: 'schemas.NotificationSetup', db: Session) -> Dict:
        """Setup notifications for a user"""
        try:
            # Clear existing notifications
            db.query(models.Notification).filter(models.Notification.user_id == user_id).delete()
            
            # Create new notifications based on user preferences
            if notification_setup.period_reminder:
                self._create_period_reminders(user_id, notification_setup.reminder_days_before, db)
            
            if notification_setup.ovulation_reminder:
                self._create_ovulation_reminders(user_id, notification_setup.reminder_days_before, db)
            
            db.commit()
            return {"message": "Notifications setup successfully"}
        except Exception as e:
            db.rollback()
            return {"error": f"Failed to setup notifications: {str(e)}"}
    
    def _create_period_reminders(self, user_id: int, days_before: int, db: Session):
        """Create period reminder notifications"""
        from services.cycle_service import CycleService
        cycle_service = CycleService()
        
        prediction = cycle_service.predict_next_period(user_id, db)
        if "predicted_date" in prediction:
            reminder_date = prediction["predicted_date"] - timedelta(days=days_before)
            
            notification = models.Notification(
                user_id=user_id,
                notification_type="period_reminder",
                message=f"Your period is expected in {days_before} days",
                scheduled_date=datetime.combine(reminder_date, datetime.min.time()),
                created_at=datetime.utcnow()
            )
            db.add(notification)
    
    def _create_ovulation_reminders(self, user_id: int, days_before: int, db: Session):
        """Create ovulation reminder notifications"""
        from services.cycle_service import CycleService
        cycle_service = CycleService()
        
        prediction = cycle_service.predict_ovulation(user_id, db)
        if "ovulation_date" in prediction:
            reminder_date = prediction["ovulation_date"] - timedelta(days=days_before)
            
            notification = models.Notification(
                user_id=user_id,
                notification_type="ovulation_reminder",
                message=f"Your fertile window starts in {days_before} days",
                scheduled_date=datetime.combine(reminder_date, datetime.min.time()),
                created_at=datetime.utcnow()
            )
            db.add(notification)
    
    def check_and_send_notifications(self, db: Session) -> Dict:
        """Check for due notifications and mark them as sent"""
        try:
            now = datetime.utcnow()
            
            # Get due notifications
            due_notifications = db.query(models.Notification).filter(
                models.Notification.scheduled_date <= now,
                models.Notification.sent == False
            ).all()
            
            sent_count = 0
            for notification in due_notifications:
                # In a real app, you would send actual notifications here
                # For now, we'll just log and mark as sent
                logging.info(f"Notification sent to user {notification.user_id}: {notification.message}")
                notification.sent = True
                sent_count += 1
            
            db.commit()
            
            return {
                "message": f"Processed {sent_count} notifications",
                "sent_count": sent_count,
                "timestamp": now
            }
        except Exception as e:
            db.rollback()
            return {"error": f"Failed to process notifications: {str(e)}"}
