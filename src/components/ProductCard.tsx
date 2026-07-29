import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import GlowLayer from "./card/GlowLayer";
import { toast } from "sonner";
import ProductImage from "./card/ProductImage";
import ProductInfo from "./card/ProductInfo";
import ProductPrice from "./card/ProductPrice";
import ProductRating from "./card/ProductRating";
import { HeartHandshakeIcon, HeartIcon } from "lucide-animated";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // 🌟 1. Importar el hook de wishlist

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  
  // 🌟 2. Extraer del contexto global
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // 🌟 3. Verificar en tiempo real si el producto ya está en favoritos
  const isWishlisted = isInWishlist(String(product.id));

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Producto añadido al carrito", {
      description: product.title,
      action: { label: "Ver carrito", onClick: () => openCart() },
    });
  };

  const handleWishlist = () => {
    // Estructura del item adaptada a tu WishlistContext
    const wishItem = {
      id: String(product.id),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      category: product.category || "General", // Ajusta según tu tipo Product
    };

    if (isWishlisted) {
      removeFromWishlist(String(product.id));
      toast.info("Eliminado de favoritos", {
        description: product.title,
        duration: 2000,
      });
    } else {
      addToWishlist(wishItem);
      toast.success("Añadido a favoritos", {
        description: product.title,
        duration: 2000,
      });
    }
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        select-none
      "
    >
      <button
        onClick={handleWishlist} 
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition"
      >
        {isWishlisted ? (
          <HeartHandshakeIcon className="text-red-500 animate-in zoom-in duration-300" />
        ) : (
          <HeartIcon className="text-white" />
        )}
      </button>

      <GlowLayer />
      <div className="h-64 flex items-center justify-center">
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <ProductInfo
        title={product.title}
      />

      <ProductPrice
        price={product.price}
        discountPercentage={product.discountPercentage}
      />

      <ProductRating
        rating={product.rating}
        count={product.reviewCount ?? 0}
      />

      <div className="mt-4 flex gap-3">
        <Link
          to={`/product/${product.id}`}
          className="
            flex-1
            rounded-full
            bg-white
            text-black
            py-3
            text-center
            font-semibold
            hover:bg-gray-200
            transition
          "
        >
          Ver
        </Link>

        <button 
          onClick={handleAddToCart}
          className="
            px-4
            rounded-full
            border
            border-white/20
            hover:bg-white/10
            transition
          "
        >
          🛒
        </button>
      </div>
    </div>
  );
}