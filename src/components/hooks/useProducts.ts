import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=200")
      .then((res) => {
        const productsWithReviews = res.data.products.map(
          (product: Product) => ({
            ...product,
            reviewCount:
              Math.floor(Math.random() * 500) + 20,
          })
        );

        setProducts(productsWithReviews);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};