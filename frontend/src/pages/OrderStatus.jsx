import { useState } from "react";
import { fetchOrderStatus } from "../api/api";

export default function OrderStatus() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const lookupOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    try {
      const response = await fetchOrderStatus(orderId);
      setOrder(response);
      setError("");
    } catch (err) {
      setOrder(null);
      setError("Order not found.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>

        {/* INPUT FIELD */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-md"
          />
          <button
            onClick={lookupOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            Track
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* ORDER RESULTS */}
        {order && (
          <div className="border rounded-lg p-5 bg-gray-50 mt-4">

            <h2 className="text-xl font-bold mb-3">Order Information</h2>

            <p className="text-gray-700 mb-1">
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p className="text-gray-700 mb-1">
              <strong>Status:</strong>{" "}
              <span className={
                order.status === "COMPLETED" ? "text-green-600" :
                order.status === "PROCESSING" ? "text-orange-500" :
                "text-blue-600"
              }>
                {order.status}
              </span>
            </p>

            <p className="text-gray-700 mb-3">
              <strong>Name:</strong> {order.name}
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>

            <ul className="list-disc ml-6 text-gray-700">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.id} — Qty: {item.qty}
                </li>
              ))}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}
