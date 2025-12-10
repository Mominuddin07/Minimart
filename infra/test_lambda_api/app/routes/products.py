from fastapi import APIRouter, HTTPException
import boto3
import os

router = APIRouter()

# Initialize DynamoDB
dynamodb = boto3.resource("dynamodb", region_name="us-west-2")

PRODUCTS_TABLE = os.environ["PRODUCTS_TABLE"]
table = dynamodb.Table(PRODUCTS_TABLE)

@router.get("/products")
def get_products():
    """
    Fetch all products from DynamoDB
    and convert `productId` → `id` for the frontend.
    """
    response = table.scan()
    items = response.get("Items", [])

    # Convert productId → id for React frontend compatibility
    for item in items:
        if "productId" in item:
            item["id"] = item["productId"]

    return items


@router.get("/products/{product_id}")
def get_product(product_id: str):
    """
    Fetch a single product from DynamoDB by productId.
    """
    response = table.get_item(Key={"productId": product_id})

    if "Item" not in response:
        raise HTTPException(status_code=404, detail="Product not found")

    item = response["Item"]

    # Convert productId → id for frontend
    item["id"] = item["productId"]

    return item
