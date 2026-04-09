import numpy as np
import pickle
from sklearn.linear_model import LinearRegression, LogisticRegression
import os

print("Starting model retraining...")

os.makedirs("models", exist_ok=True)

# Price model
print("Retraining price predictor...")
days = np.array([1, 2, 3, 4, 5, 6, 7]).reshape(-1, 1)
prices = np.array([20.0, 21.5, 20.0, 22.5, 21.0, 23.0, 22.5])

price_model = LinearRegression()
price_model.fit(days, prices)

with open("models/price_model.pkl", "wb") as f:
    pickle.dump(price_model, f)

print("Price predictor saved")

# Stockout model
print("Retraining stockout detector...")
X = np.array([[1,0,1],[1,1,0],[0,1,1],[1,0,0],[0,0,1]])
y = np.array([0, 0, 1, 1, 1])

stockout_model = LogisticRegression()
stockout_model.fit(X, y)

with open("models/stockout_model.pkl", "wb") as f:
    pickle.dump(stockout_model, f)

print("Stockout detector saved")
print("All models retrained successfully!")