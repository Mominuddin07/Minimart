from fastapi import APIRouter
import json
import os
import time

router = APIRouter()

ORDERS_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "orders.json")

@router.post("/process-orders")
def process_orders():
    """
    Simulates background order processing.
    Converts PENDING → PROCESSING → COMPLETED
    """

    with open(ORDERS_PATH, "r") as f:
        data = json.load(f)

    processed_count = 0

    for order in data["orders"]:
        if order["status"] == "PENDING":
            # Simulate processing steps
            order["status"] = "PROCESSING"
            time.sleep(0.5)  # simulate work
            order["status"] = "COMPLETED"
            processed_count += 1

    with open(ORDERS_PATH, "w") as f:
        json.dump(data, f, indent=4)

    return {
        "status": "success",
        "message": f"Processed {processed_count} order(s)."
    }
