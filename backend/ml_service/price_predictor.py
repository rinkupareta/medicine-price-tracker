import numpy as np
from sklearn.linear_model import LinearRegression
import logging

logger = logging.getLogger(__name__)

def predict_price(medicine: str, platform: str):
    try:
        # Mock historical data
        days = np.array([1, 2, 3, 4, 5, 6, 7]).reshape(-1, 1)
        prices = np.array([20.0, 21.5, 20.0, 22.5, 21.0, 23.0, 22.5])

        model = LinearRegression()
        model.fit(days, prices)

        next_days = np.array([8, 9, 10, 11, 12, 13, 14]).reshape(-1, 1)
        predictions = model.predict(next_days)

        trend = "rising" if predictions[-1] > predictions[0] else "stable"

        return {
            "medicine": medicine,
            "platform": platform,
            "next_7_days_prices": [round(p, 2) for p in predictions.tolist()],
            "trend": trend,
            "confidence": "medium"
        }

    except Exception as e:
        logger.error(f"Price prediction failed: {e}")
        return {"error": str(e)}