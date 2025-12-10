from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import products, checkout, orders, worker

app = FastAPI(title="MiniMart Backend API", version="1.0")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(products.router, tags=["Products"])
app.include_router(checkout.router, tags=["Checkout"])
app.include_router(orders.router, tags=["Orders"])
app.include_router(worker.router, tags=["Worker"])

@app.get("/")
def home():
    return {"message": "MiniMart Backend Running"}
