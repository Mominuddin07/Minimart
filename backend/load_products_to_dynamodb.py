import boto3
import json

# DynamoDB table name
TABLE_NAME = "MiniMart_Products"

# Load products JSON from correct path
with open("data/products.json", "r") as f:
    data = json.load(f)["products"]

# Force boto3 to use the correct region & SSO profile
session = boto3.Session(region_name="us-west-2")
dynamodb = session.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

print(f"Uploading {len(data)} products to DynamoDB table: {TABLE_NAME}")

for product in data:
    item = {
        "productId": product["id"],
        "name": product["name"],
        "price": str(product["price"]),
        "image": product["image"],
        "category": product["category"],
        "rating": str(product["rating"]),
        "reviews": str(product["reviews"])
    }

    table.put_item(Item=item)
    print(f"Inserted: {product['id']}")

print("DONE! All products inserted successfully.")
