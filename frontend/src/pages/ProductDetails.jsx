import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center p-10 text-xl">Product not found.</div>;
  }

  // ⭐ AI-like auto-generated product details logic
  const getProductDetails = (product) => {
    const name = product.name;
    const category = product.category;

    // Output structure
    let description = "";
    let features = [];
    let specs = {};

    // =======================
    // CPU DETAILS
    // =======================
    if (category === "CPU") {
      description = `The ${name} is a high-performance desktop processor designed for gamers, content creators, and power users. Built with cutting-edge architecture, it delivers exceptional single-threaded and multi-threaded performance for demanding workloads.`;

      features = [
        "Ultra-fast clock speeds for gaming and productivity",
        "Excellent multi-core performance for streaming and rendering",
        "Optimized thermal design for sustained heavy workload usage",
        "Compatible with modern motherboard chipsets",
        "Ideal for high-end gaming PCs and workstations"
      ];

      specs = {
        "Category": "CPU",
        "Brand": name.split(" ")[0],
        "Model": name,
        "Performance": "High-end desktop performance",
        "Use Case": "Gaming, content creation, productivity"
      };
    }

    // =======================
    // GPU DETAILS
    // =======================
    if (category === "GPU") {
      description = `The ${name} is a powerful graphics card engineered for advanced gaming, 3D rendering, and AI-accelerated workloads. It offers smooth performance at high resolutions and supports the latest graphics technologies.`;

      features = [
        "Advanced ray tracing hardware",
        "AI-powered upscaling for higher FPS",
        "High-bandwidth memory for 4K gaming",
        "Optimized cooling for quiet operation",
        "Reliable performance for creative workflows"
      ];

      specs = {
        "Category": "GPU",
        "Brand": name.split(" ")[0],
        "Model": name,
        "Performance": "High-end gaming & rendering",
        "VR Ready": "Yes"
      };
    }

    // =======================
    // LAPTOP DETAILS
    // =======================
    if (category === "Laptop") {
      description = `The ${name} is a premium laptop built for professionals, students, and creators who need powerful performance in a compact form factor. With excellent battery life and a stunning display, it balances portability and productivity perfectly.`;

      features = [
        "Lightweight, sleek, professional design",
        "Fast SSD storage for instant responsiveness",
        "Long-lasting battery life",
        "High-resolution display with vibrant colors",
        "Perfect for work, school, and travel"
      ];

      specs = {
        "Category": "Laptop",
        "Brand": name.split(" ")[0],
        "Model": name,
        "Battery Life": "All-day usage",
        "Storage": "SSD",
        "Display": "High-resolution panel"
      };
    }

    // =======================
    // SSD DETAILS
    // =======================
    if (category === "SSD") {
      description = `The ${name} is a blazing-fast NVMe SSD designed for rapid boot times, instant loading, and heavy data workloads. It dramatically improves overall system responsiveness and transfer speeds.`;

      features = [
        "High sequential read/write speeds",
        "Improves game and application loading",
        "Reliable storage technology",
        "Perfect for gaming PCs and productivity laptops",
        "Energy-efficient and durable"
      ];

      specs = {
        "Category": "SSD",
        "Brand": name.split(" ")[0],
        "Model": name,
        "Interface": "NVMe",
        "Use Case": "Fast storage, gaming, workstation"
      };
    }

    // =======================
    // HEADPHONE DETAILS
    // =======================
    if (category === "Headphones") {
      description = `The ${name} delivers premium audio quality with excellent noise cancellation, making it ideal for music lovers, commuters, and professionals.`;

      features = [
        "Active noise cancellation",
        "Crystal-clear audio quality",
        "Comfortable ear cushions",
        "Long battery life",
        "Lightweight & travel-friendly"
      ];

      specs = {
        "Category": "Headphones",
        "Brand": name.split(" ")[0],
        "Model": name,
        "Connection": "Wireless",
        "Noise Cancellation": "Yes"
      };
    }

    // =======================
    // KEYBOARD & MOUSE DETAILS
    // =======================
    if (category === "Keyboard" || category === "Mouse") {
      description = `The ${name} offers precision, comfort, and top-tier durability — perfect for gaming, work, or everyday use.`;

      features = [
        "Responsive and accurate input",
        "Ergonomic design for long usage",
        "Durable build quality",
        "Ideal for productivity and gaming",
        "Plug-and-play compatibility"
      ];

      specs = {
        "Category": category,
        "Brand": name.split(" ")[0],
        "Model": name,
        "Use Case": "Office, gaming, home"
      };
    }

    return { description, features, specs };
  };

  const details = getProductDetails(product);

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="flex justify-center">
            <img 
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[400px] object-contain rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-red-600 mb-3">${product.price}</p>
            <p className="text-gray-700 mb-1">
              ⭐ {product.rating} ({product.reviews} reviews)
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Category: <span className="font-semibold">{product.category}</span>
            </p>

            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-md"
            >
              Add to Cart
            </button>
          </div>

        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{details.description}</p>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Key Features</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {details.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(details.specs).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-semibold w-32">{key}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
