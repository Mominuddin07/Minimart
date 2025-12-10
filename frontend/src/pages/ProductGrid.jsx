import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api";

export default function ProductGrid({ selectedCategory }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter based on selected category
  const filtered = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading products...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-600 mb-4">
          Showing {filtered.length} {selectedCategory} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard 
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              rating={p.rating}
              reviews={p.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
