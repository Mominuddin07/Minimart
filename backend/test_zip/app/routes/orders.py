from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

ORDERS_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "orders.json")

@router.get("/orders/{order_id}")
def get_order(order_id: str):
    with open(ORDERS_PATH, "r") as f:
        data = json.load(f)

    for order in data["orders"]:
        if order["orderId"] == order_id:
            return order

    raise HTTPException(status_code=404, detail="Order not found")
