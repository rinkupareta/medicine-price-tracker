from fastapi import FastAPI
from routes.search import router as search_router
from routes.ml import router as ml_router

app = FastAPI()

# Root
@app.get("/")
def root():
    return {"message": "Medicine Price Tracker API running"}

# Health
@app.get("/health")
def health():
    return {"status": "ok"}

# Include routes
app.include_router(search_router)
app.include_router(ml_router)