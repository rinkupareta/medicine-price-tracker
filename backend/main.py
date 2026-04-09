from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.search import router as search_router
from routes.ml import router as ml_router

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="MediCompare API",
    description="Real-time medicine price comparison across Indian pharmacy platforms",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")
app.include_router(ml_router, prefix="/api/ml")

@app.get("/")
def root():
    return {"message": "MediCompare API is running"}

@app.get("/health")
def health():
    logger.info("Health check called")
    return {"status": "ok", "service": "MediCompare API"}