import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ id, name, price, image, rating, reviews }) {
  const { addToCart } = useCart();
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400 text-sm">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-sm">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition flex flex-col h-full">
      
      {/* Image */}
      <Link to={`/product/${id}`}>
        <div className="w-full h-48 mb-3 flex items-center justify-center bg-white">
          <img 
            src={image} 
            alt={name} 
            className="max-w-full max-h-full object-contain rounded-md hover:scale-105 transition"
          />
        </div>
      </Link>

      {/* Name */}
      <Link to={`/product/${id}`}>
        <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-orange-600 cursor-pointer">
          {name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2 flex-wrap">
        {renderStars(rating)}
        <span className="text-xs text-blue-600 ml-1">{rating}</span>
        <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
      </div>

      {/* Price */}
      <span className="text-lg font-bold text-red-700 mb-3">${price}</span>

      {/* Add to Cart */}
      <button
        className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-2 px-4 rounded-md"
        onClick={() => addToCart({ id, name, price, image })}
      >
        Add to Cart
      </button>

    </div>
  );
}
