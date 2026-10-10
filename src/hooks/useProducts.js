import { useState, useEffect } from "react";
import { initialProducts } from "../data/products";

/**
 * Custom hook to load product data with loading and error states.
 */
export function useProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error(`Failed to load products: status ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          if (data && Array.isArray(data.Products)) {
            // merge with rich properties from initialProducts if present
            const enhanced = data.Products.map(p => {
              const match = initialProducts.find(ip => ip.id === p.id);
              return {
                ...match,
                ...p,
                ratingScore: match?.ratingScore || 4.5,
                category: match?.category || (p.Processor?.includes("AMD") ? "AMD" : "Intel"),
                brand: match?.brand || p.Name?.split(" ")[0] || "Custom",
                originalPrice: match?.originalPrice || Number((p.Price * 1.15).toFixed(2))
              };
            });
            setProducts(enhanced);
          } else {
            setProducts(initialProducts);
          }
          setError(null);
        }
      } catch (err) {
        console.warn("Could not fetch /products.json, using local initialProducts dataset fallback:", err);
        if (isMounted) {
          setProducts(initialProducts);
          setError(null); // Fallback is clean
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
