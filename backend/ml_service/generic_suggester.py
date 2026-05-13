import logging

logger = logging.getLogger(__name__)

GENERIC_MAP = {
     "paracetamol": {
    "generic": "Paracetamol IP 500mg",
    "avg_price": 8.00
},
    "crocin": {"generic": "Paracetamol IP 500mg", "avg_price": 8.00},
    "dolo": {"generic": "Paracetamol IP 650mg", "avg_price": 10.00},
    "combiflam": {"generic": "Ibuprofen + Paracetamol", "avg_price": 12.00},
    "aspirin": {"generic": "Acetylsalicylic Acid 75mg", "avg_price": 5.00},
    "metformin": {"generic": "Metformin HCl 500mg", "avg_price": 15.00},
    "pantoprazole": {"generic": "Pantoprazole Sodium 40mg", "avg_price": 18.00},
    "atorvastatin": {"generic": "Atorvastatin Calcium 10mg", "avg_price": 20.00},
    "amoxicillin": {"generic": "Amoxicillin Trihydrate 500mg", "avg_price": 25.00},
    "azithromycin": {"generic": "Azithromycin 500mg", "avg_price": 30.00},
    "omeprazole": {"generic": "Omeprazole 20mg", "avg_price": 12.00},
    "cetirizine": {"generic": "Cetirizine HCl 10mg", "avg_price": 8.00},
    "ibuprofen": {"generic": "Ibuprofen IP 400mg", "avg_price": 10.00},
}

def suggest_generic(medicine: str):
    try:
        key = medicine.lower().strip().split()[0]

        if key in GENERIC_MAP:
            alt = GENERIC_MAP[key]
            return {
                "medicine": medicine,
                "found": True,
                "generic_name": alt["generic"],
                "avg_price": alt["avg_price"],
                "message": f"Generic available at ~₹{alt['avg_price']}"
            }

        return {
            "medicine": medicine,
            "found": False,
            "message": "No generic alternative found"
        }

    except Exception as e:
        logger.error(f"Generic suggestion failed: {e}")
        return {"error": str(e)}
