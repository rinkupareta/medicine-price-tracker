import logging

logger = logging.getLogger(__name__)

def predict_stockout(medicine: str, platform: str):
    try:
        # Mock availability history (1 = in stock, 0 = out of stock)
        history = [1, 1, 1, 0, 1, 1, 0, 1, 0, 1]

        recent = history[-5:]
        stockout_count = recent.count(0)
        risk_score = stockout_count / len(recent)

        if risk_score > 0.4:
            risk_level = "High"
        elif risk_score > 0.2:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        return {
            "medicine": medicine,
            "platform": platform,
            "risk_percentage": round(risk_score * 100, 2),
            "risk_level": risk_level,
            "message": f"Based on recent availability history on {platform}"
        }

    except Exception as e:
        logger.error(f"Stockout prediction failed: {e}")
        return {"error": str(e)}