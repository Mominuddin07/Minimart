import json
from mangum import Mangum
from app.main import app

handler = Mangum(app)

def lambda_handler(event, context):
    """
    API Gateway HTTP API (v2) sends:
    {
        "routeKey": "$default",
        "rawPath": "/products",
        "requestContext": { "http": { "method": "GET" }}
    }
    Mangum handles FastAPI routing, so we just pass event to Mangum.
    """

    print("EVENT RAW:", json.dumps(event))  # Debug

    response = handler(event, context)

    # Add CORS headers ALWAYS
    if "headers" not in response:
        response["headers"] = {}

    response["headers"]["Access-Control-Allow-Origin"] = "*"
    response["headers"]["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response["headers"]["Access-Control-Allow-Headers"] = "*"

    return response
