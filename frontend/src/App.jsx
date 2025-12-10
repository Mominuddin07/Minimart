import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProductGrid from "./pages/ProductGrid";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderStatus from "./pages/OrderStatus";   // ⭐ IMPORTANT: Add this import

import { useCart } from "./context/CartContext";

// Category List
const categories = [
  "All",
  "CPU",
  "GPU",
  "Laptop",
  "SSD",
  "Headphones",
  "Keyboard",
  "Mouse"
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { cartCount } = useCart();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white w-full overflow-x-hidden">

        {/* Header */}
        <header className="bg-[#131921] text-white w-full sticky top-0 z-50">
          <div className="w-full mx-auto max-w-[1920px]">
            <div className="flex items-center justify-between h-14 px-2 sm:px-4 lg:px-6">

              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <h1
                  className="text-xl sm:text-2xl font-bold text-white hover:text-orange-400 cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory("All")}
                >
                  MiniMart
                </h1>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden md:flex">
                <div className="w-full flex">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 text-gray-900 rounded-l-md"
                  />
                  <button className="bg-[#febd69] px-4 py-2 rounded-r-md text-gray-900">
                    🔍
                  </button>
                </div>
              </div>

              {/* Cart + Account */}
              <div className="flex items-center gap-4">

                <div className="hidden md:block text-sm hover:text-orange-400 cursor-pointer">
                  <div className="text-xs leading-tight">Returns</div>
                  <div className="font-semibold leading-tight">& Orders</div>
                </div>

                <Link to="/cart" className="relative hover:text-orange-400 cursor-pointer flex items-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 007 17h10a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-[#232f3e] w-full">
            <div className="max-w-[1920px] mx-auto px-4">
              <div className="flex items-center gap-4 h-10 overflow-x-auto">

                <span
                  onClick={() => setSelectedCategory("All")}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedCategory === "All"
                      ? "text-orange-400 border-b-2 border-orange-400"
                      : "hover:text-orange-400"
                  }`}
                >
                  All
                </span>

                {categories.filter(c => c !== "All").map(category => (
                  <span
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer whitespace-nowrap px-2 py-1 ${
                      selectedCategory === category
                        ? "text-orange-400 border-b-2 border-orange-400"
                        : "hover:text-orange-400"
                    }`}
                  >
                    {category}
                  </span>
                ))}

              </div>
            </div>
          </div>
        </header>

        {/* ROUTES */}
        <main className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <ProductGrid
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* ⭐ MUST BE HERE (ONLY ONCE!) */}
            <Route path="/order-status" element={<OrderStatus />} />

            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
