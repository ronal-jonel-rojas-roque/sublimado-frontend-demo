import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../components/hooks/useProducts';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart, openCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.id === Number(id));
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Actualizar imagen principal cuando cambia el producto
/*   useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
    }
  }, [product]);
 */
  // Cálculo de Descuento
  const discountAmount = product ? (product.price * (product.discountPercentage || 0)) / 100 : 0;
  const finalPrice = product ? product.price - discountAmount : 0;

  //Carrito
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success("Producto añadido al carrito", {
      description: product.title,
      action: { label: "Ver carrito", onClick: () => openCart() },
    });
  };

  // Lógica para productos relacionados (misma categoría, distinto id)
  const relatedProducts = useMemo(() => {
    if (!product) return [];

    // 1. Obtenemos todos los productos que NO son el actual
    const allOtherProducts = products.filter((p) => p.id !== product.id);

    // 2. Separamos: los de la misma categoría y los de otras
    const sameCategory = allOtherProducts.filter(
      (p) => p.category === product.category
    );

    const otherCategories = allOtherProducts.filter(
      (p) => p.category !== product.category
    );

    // 3. Combinamos: Primero los de la misma categoría, 
    // luego los de otras para completar hasta 10
    return [...sameCategory, ...otherCategories].slice(0, 10);
  }, [product, products]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [relatedProducts]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-96 bg-white/10 rounded-3xl"></div>
          <div className="h-8 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className='h-20'></div>
      <div key={product.id} className="max-w-6xl pt-10 mx-auto">

        {/* Sección Superior: Detalle del Producto */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* Columna Izquierda: Galería */}
          <div className="space-y-4">
            <div className="w-full h-96 bg-white/5 rounded-3xl overflow-hidden flex items-center justify-center">
              <img src={mainImage || product.thumbnail} alt={product.title} className="max-h-full object-contain" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((img, index) => (
                <button key={index} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${mainImage === img ? 'border-white' : 'border-white/10 hover:border-white/50'}`}>
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Info */}
          <div>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-gray-400 mt-4 leading-relaxed">{product.description}</p>
            <div className="mt-6">
              {product?.discountPercentage ? (
                <div className="flex items-center justify-center p-5 gap-4">
                  <span className="text-3xl font-semibold text-white">S/ {finalPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-500 line-through">S/ {product.price}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-bold">-{product.discountPercentage}%</span>
                </div>
              ) : (
                <p className="text-3xl mt-6 font-semibold">S/ {product?.price}</p>
              )}
            </div>
            {/* <div className="mt-4 text-yellow-500">★ {product.rating}</div> */}

            <div className="flex gap-4 mt-8">
              <button className="flex-1 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition">Comprar ahora</button>
              <button onClick={handleAddToCart} className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition">Añadir al carrito</button>
            </div>

            <div className="mt-12 border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Especificaciones</h3>
              {product.dimensions ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-500 text-xs">Ancho</p><p className="font-semibold">{product.dimensions.width} cm</p></div>
                  <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-500 text-xs">Alto</p><p className="font-semibold">{product.dimensions.height} cm</p></div>
                  <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-500 text-xs">Profundidad</p><p className="font-semibold">{product.dimensions.depth} cm</p></div>
                  <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-500 text-xs">Peso</p><p className="font-semibold">{product.dimensions.weight} kg</p></div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Información técnica no disponible.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Sección Inferior: Productos Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>

          {/* 2. Ya no uses ProductGrid, itera directamente ProductCard */}
         <div 
  ref={carouselRef} 
  className="flex gap-6 overflow-x-auto pb-4 snap-x 
             [&::-webkit-scrollbar]:hidden 
             [-ms-overflow-style:none] 
             [scrollbar-width:none]"
>
            {relatedProducts.map((p) => (
              <div key={p.id} className="min-w-[280px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}