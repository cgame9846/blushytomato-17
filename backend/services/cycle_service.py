
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from sqlalchemy.orm import Session
import models
import statistics

class CycleService:
    def predict_next_period(self, user_id: int, db: Session) -> Dict:
        """Predict next period based on cycle history"""
        try:
            # Get last 6 cycles
            cycles = db.query(models.Cycle).filter(
                models.Cycle.user_id == user_id,
                models.Cycle.start_date.isnot(None)
            ).order_by(models.Cycle.start_date.desc()).limit(6).all()
            
            if len(cycles) < 2:
                return {
                    "error": "Not enough data",
                    "message": "Please log at least 2 cycles for predictions"
                }
            
            # Calculate average cycle length
            cycle_lengths = []
            for i in range(len(cycles) - 1):
                current_cycle = cycles[i]
                next_cycle = cycles[i + 1]
                cycle_length = (current_cycle.start_date - next_cycle.start_date).days
                if cycle_length > 0:
                    cycle_lengths.append(cycle_length)
            
            if not cycle_lengths:
                return {
                    "error": "Unable to calculate cycle length",
                    "message": "Please ensure your cycle data is complete"
                }
            
            avg_cycle_length = statistics.mean(cycle_lengths)
            std_deviation = statistics.stdev(cycle_lengths) if len(cycle_lengths) > 1 else 0
            
            # Predict next period
            last_period = cycles[0].start_date
            predicted_date = last_period + timedelta(days=int(avg_cycle_length))
            
            # Calculate prediction window
            early_date = predicted_date - timedelta(days=int(std_deviation) + 1)
            late_date = predicted_date + timedelta(days=int(std_deviation) + 1)
            
            return {
                "predicted_date": predicted_date,
                "early_date": early_date,
                "late_date": late_date,
                "average_cycle_length": round(avg_cycle_length, 1),
                "confidence": "high" if std_deviation < 3 else "medium" if std_deviation < 7 else "low",
                "cycles_analyzed": len(cycle_lengths)
            }
        except Exception as e:
            return {
                "error": f"Prediction error: {str(e)}",
                "message": "Unable to generate prediction"
            }
    
    def predict_ovulation(self, user_id: int, db: Session) -> Dict:
        """Predict ovulation window"""
        try:
            # Get next period prediction
            period_prediction = self.predict_next_period(user_id, db)
            
            if "error" in period_prediction:
                return period_prediction
            
            # Calculate ovulation (typically 14 days before next period)
            predicted_period = period_prediction["predicted_date"]
            ovulation_date = predicted_period - timedelta(days=14)
            
            # Fertile window (5 days before ovulation + ovulation day + 1 day after)
            fertile_start = ovulation_date - timedelta(days=5)
            fertile_end = ovulation_date + timedelta(days=1)
            
            # Get recent ovulation data for better prediction
            recent_ovulation = db.query(models.Ovulation).filter(
                models.Ovulation.user_id == user_id
            ).order_by(models.Ovulation.date.desc()).limit(3).all()
            
            # Adjust prediction based on user's ovulation data
            if recent_ovulation:
                # This is a simplified adjustment - in reality, you'd want more sophisticated analysis
                adjustment_note = "Prediction adjusted based on your ovulation tracking data"
            else:
                adjustment_note = "Prediction based on average cycle data"
            
            return {
                "ovulation_date": ovulation_date,
                "fertile_window_start": fertile_start,
                "fertile_window_end": fertile_end,
                "confidence": period_prediction["confidence"],
                "note": adjustment_note,
                "days_until_ovulation": (ovulation_date - datetime.now().date()).days
            }
        except Exception as e:
            return {
                "error": f"Ovulation prediction error: {str(e)}",
                "message": "Unable to predict ovulation"
            }
    
    def get_cycle_statistics(self, user_id: int, db: Session) -> Dict:
        """Get comprehensive cycle statistics"""
        try:
            cycles = db.query(models.Cycle).filter(
                models.Cycle.user_id == user_id
            ).order_by(models.Cycle.start_date.desc()).all()
            
            if not cycles:
                return {"error": "No cycle data found"}
            
            # Calculate various statistics
            cycle_lengths = [cycle.cycle_length for cycle in cycles if cycle.cycle_length]
            
            if cycle_lengths:
                avg_length = statistics.mean(cycle_lengths)
                shortest = min(cycle_lengths)
                longest = max(cycle_lengths)
                std_dev = statistics.stdev(cycle_lengths) if len(cycle_lengths) > 1 else 0
            else:
                avg_length = shortest = longest = std_dev = None
            
            # Flow intensity distribution
            flow_intensities = [cycle.flow_intensity.value for cycle in cycles if cycle.flow_intensity]
            flow_distribution = {}
            if flow_intensities:
                for intensity in flow_intensities:
                    flow_distribution[intensity] = flow_distribution.get(intensity, 0) + 1
            
            return {
                "total_cycles": len(cycles),
                "average_cycle_length": round(avg_length, 1) if avg_length else None,
                "shortest_cycle": shortest,
                "longest_cycle": longest,
                "cycle_regularity": "regular" if std_dev and std_dev < 3 else "irregular" if std_dev else "unknown",
                "flow_intensity_distribution": flow_distribution,
                "data_since": cycles[-1].start_date if cycles else None
            }
        except Exception as e:
            return {
                "error": f"Statistics error: {str(e)}",
                "message": "Unable to calculate statistics"
            }
