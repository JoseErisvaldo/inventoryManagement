import { useEffect, useState } from "react";
import supabase from "../../supabase";

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estoque</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
            <p className="text-sm font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
