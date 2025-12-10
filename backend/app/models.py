from pydantic import BaseModel
from typing import List

class CartItem(BaseModel):
    id: str
    qty: int

class CheckoutRequest(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    items: List[CartItem]

class Order(BaseModel):
    orderId: str
    name: str
    email: str
    phone: str
    address: str
    items: List[CartItem]
    status: str  # PENDING, PROCESSING, COMPLETED
