import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { checkoutOrder } from "../api/api";  // <-- Backend API call

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill all fields.");
      return;
    }

    const orderData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cart.map((item) => ({
        id: item.id,
        qty: item.qty,
      })),
    };

    try {
      // POST order to backend
      const res = await checkoutOrder(orderData);

      // Clear cart
      clearCart();

      // Redirect to success page with real backend orderId
      navigate(`/order-success/${res.orderId}`);

    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed, please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">
          Add items to your cart before checking out.
        </p>
        <a
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md text-gray-900 font-medium"
        >
          Go Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Billing Form */}
          <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border rounded-md px-4 py-2"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full border rounded-md px-4 py-2"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full border rounded-md px-4 py-2"
                value={form.phone}
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Shipping Address"
                className="w-full border rounded-md px-4 py-2"
                rows="4"
                value={form.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex justify-between">
                  <span className="text-gray-700">
                    {item.name} (x{item.qty})
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-md"
            >
              Place Order
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
