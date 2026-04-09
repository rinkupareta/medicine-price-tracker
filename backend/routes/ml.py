from fastapi import APIRouter

router = APIRouter()

@router.get("/predict")
def predict_price(medicine: str):
    return {
        "medicine": medicine,
        "predicted_price": 100
    }