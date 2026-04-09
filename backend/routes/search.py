from fastapi import APIRouter

router = APIRouter()

@router.get("/search")
def search_medicine(name: str):
    return {
        "medicine": name,
        "price": "Sample price",
        "source": "Demo API"
    }