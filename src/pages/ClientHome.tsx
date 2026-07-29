import Hero from "../components/hero/Hero";
import ProductGrid from "../components/ProductGrid";

import { useProducts } from "../components/hooks/useProducts";

const ClientHome = () => {
  const { products } = useProducts();

  const featuredProducts = products.slice(0, 5);

  return (
    <div className="min-h-screen bg-black">

      <Hero />
      <div className="h-24 w-full bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />
      <section className="px-10 py-6">
        <h1 className="text-2xl font-bold mb-4 uppercase font-italica">NOVEDADES</h1>
        <div className="h-24 w-full bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />
        <ProductGrid products={featuredProducts} />
      </section>
      <div className="h-24 w-full bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />
    </div>
  );
};
export default ClientHome;