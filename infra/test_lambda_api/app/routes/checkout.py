from fastapi import APIRouter, HTTPException
import boto3
import os
import uuid
import json
from app.models import CheckoutRequest

router = APIRouter()

# Initialize SQS
sqs = boto3.client("sqs", region_name="us-west-2")
QUEUE_URL = os.environ["QUEUE_URL"]   # Set by Terraform

@router.post("/checkout")
def checkout(order: CheckoutRequest):

    try:
        # Create orderId
        order_id = f"ORD-{str(uuid.uuid4())[:8]}"

        # Build message to send to worker
        message = {
            "orderId": order_id,
            "name": order.name,
            "email": order.email,
            "phone": order.phone,
            "address": order.address,
            "items": [item.dict() for item in order.items],
            "status": "PENDING"
        }

        # Send message to SQS queue
        sqs.send_message(
            QueueUrl=QUEUE_URL,
            MessageBody=json.dumps(message)
        )

        # Return immediately
        return {"orderId": order_id, "status": "PENDING"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
