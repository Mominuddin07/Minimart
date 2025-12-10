// USE LIVE AWS BACKEND
const API_BASE_URL = "https://8pwacsmzc0.execute-api.us-west-2.amazonaws.com";

// =====================
// Get all products
// =====================
export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// =====================
// Get single product
// =====================
export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
}

// =====================
// Checkout (POST)
// =====================
export async function checkoutOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Checkout failed");
  }

  return response.json();  // returns { orderId, status }
}

// =====================
// Track Order
// =====================
export async function fetchOrderStatus(orderId) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
  if (!response.ok) {
    throw new Error("Order not found");
  }
  return response.json();
}
