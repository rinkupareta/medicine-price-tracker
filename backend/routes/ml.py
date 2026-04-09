from fastapi import APIRouter
from ml_service.price_predictor import predict_price
from ml_service.stockout_detector import predict_stockout
from ml_service.generic_suggester import suggest_generic

router = APIRouter(prefix="/api/ml")

@router.get("/predict-price")
def get_price(medicine: str, platform: str = "PharmEasy"):
    return predict_price(medicine, platform)

@router.get("/stockout-risk")
def get_stockout(medicine: str, platform: str = "PharmEasy"):
    return predict_stockout(medicine, platform)

@router.get("/generic-alternative")
def get_generic(medicine: str):
    return suggest_generic(medicine)