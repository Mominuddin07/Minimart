import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate(); // ✅ Added

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const goToCheckout = () => {
    navigate("/checkout"); // ✅ Navigation instead of alert
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-24 h-24 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Amazon Cart is empty
            </h2>
            <p className="text-gray-600 mb-6">Shop today's deals</p>
            <Link
              to="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-blue-600 hover:text-orange-600 hover:underline"
                  >
                    Delete all items
                  </button>
                </div>

                <div className="border-t border-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-200 py-4 last:border-b-0"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-white flex items-center justify-center border border-gray-200 rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 mb-2 hover:text-orange-600 cursor-pointer">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              In Stock
                            </p>
                            <p className="text-lg font-semibold text-red-700 mb-3">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          {/* Quantity and Actions */}
                          <div className="flex items-center gap-4 mt-auto">
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-gray-700">
                                Qty:
                              </label>
                              <select
                                value={item.qty}
                                onChange={(e) =>
                                  updateQty(item.id, Number(e.target.value))
                                }
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex gap-4 text-sm">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-blue-600 hover:text-orange-600 hover:underline"
                              >
                                Delete
                              </button>
                              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                                Save for later
                              </button>
                              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtotal */}
              <div className="bg-white rounded-lg shadow-sm p-4 text-right">
                <p className="text-lg">
                  Subtotal ({cart.length}{" "}
                  {cart.length === 1 ? "item" : "items"}):{" "}
                  <span className="font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Subtotal ({cart.length}{" "}
                    {cart.length === 1 ? "item" : "items"}):{" "}
                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Estimated tax:{" "}
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-red-700">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* REPLACED ALERT WITH NAVIGATION */}
                <button
                  onClick={goToCheckout}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors mb-3"
                >
                  Proceed to checkout
                </button>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>🔒 Secure transaction</p>
                  <p>Your transaction is secure</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
