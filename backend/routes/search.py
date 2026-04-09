from fastapi import APIRouter, HTTPException
import sys
import os

# Add scrapers folder to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../../scrapers'))

from pharmeasy import scrape_pharmeasy
from onemg import scrape_onemg
from netmeds import scrape_netmeds
from apollo import scrape_apollo

router = APIRouter()


@router.get("/search")
async def search_medicine(query: str):
    if not query or len(query.strip()) < 2:
        raise HTTPException(status_code=400, detail="Query too short")

    results = []

    scrapers = [
        scrape_pharmeasy,
        scrape_onemg,
        scrape_netmeds,
        scrape_apollo,
    ]

    for scraper in scrapers:
        try:
            data = scraper(query)
            results.extend(data)
        except Exception:
            continue

    return {
        "query": query,
        "total": len(results),
        "results": results
    }