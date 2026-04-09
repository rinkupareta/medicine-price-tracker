from fastapi import FastAPI
from price_predictor import predict_price
from stockout_detector import predict_stockout
from generic_suggester import suggest_generic

app = FastAPI(title="ML Service")

@app.get("/")
def root():
    return {"message": "ML Service is running"}

@app.get("/predict-price")
def get_price(medicine: str, platform: str = "PharmEasy"):
    return predict_price(medicine, platform)

@app.get("/stockout-risk")
def get_stockout(medicine: str, platform: str = "PharmEasy"):
    return predict_stockout(medicine, platform)

@app.get("/generic-alternative")
def get_generic(medicine: str):
    return suggest_generic(medicine)