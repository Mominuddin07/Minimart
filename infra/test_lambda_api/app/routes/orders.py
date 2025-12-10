from fastapi import APIRouter, HTTPException
import boto3
import os

router = APIRouter()

# DynamoDB setup
dynamodb = boto3.resource("dynamodb")

ORDERS_TABLE = os.environ["ORDERS_TABLE"]
orders_table = dynamodb.Table(ORDERS_TABLE)

@router.get("/orders/{order_id}")
def get_order(order_id: str):
    response = orders_table.get_item(Key={"orderId": order_id})

    if "Item" not in response:
        raise HTTPException(status_code=404, detail="Order not found")

    return response["Item"]
