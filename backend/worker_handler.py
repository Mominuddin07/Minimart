import boto3
import json
import os
from datetime import datetime

dynamodb = boto3.resource("dynamodb")

# Use environment variables passed by Terraform
ORDERS_TABLE = os.environ["ORDERS_TABLE"]
AUDIT_TABLE = os.environ["AUDIT_TABLE"]

orders_table = dynamodb.Table(ORDERS_TABLE)
audit_table = dynamodb.Table(AUDIT_TABLE)

def handler(event, context):
    for record in event.get("Records", []):
        body = json.loads(record["body"])
        order_id = body["orderId"]

        # 1️⃣ INSERT ORDER FIRST (required)
        orders_table.put_item(Item={
            "orderId": order_id,
            "name": body["name"],
            "email": body["email"],
            "phone": body["phone"],
            "address": body["address"],
            "items": body["items"],
            "status": "PENDING",
            "createdAt": datetime.utcnow().isoformat(),
        })

        audit_table.put_item(Item={
            "logId": f"{order_id}-created",
            "timestamp": datetime.utcnow().isoformat(),
            "event": "Order created in DynamoDB"
        })

        # 2️⃣ Update order → PROCESSING
        orders_table.update_item(
            Key={"orderId": order_id},
            UpdateExpression="SET #s = :processing",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={":processing": "PROCESSING"},
        )

        audit_table.put_item(Item={
            "logId": f"{order_id}-processing",
            "timestamp": datetime.utcnow().isoformat(),
            "event": "Order moved to PROCESSING"
        })

        # 3️⃣ Update → COMPLETED
        orders_table.update_item(
            Key={"orderId": order_id},
            UpdateExpression="SET #s = :completed",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={":completed": "COMPLETED"},
        )

        audit_table.put_item(Item={
            "logId": f"{order_id}-completed",
            "timestamp": datetime.utcnow().isoformat(),
            "event": "Order completed"
        })

    return {"status": "done"}
