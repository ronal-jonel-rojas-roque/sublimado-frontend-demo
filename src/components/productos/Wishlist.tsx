import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext"; 
import { useCart } from "../../context/CartContext";       
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); 

  const handleRemove = (id: string, name: string) => {
    removeFromWishlist(id);
    
    // 🌟 2. Disparar la alerta al eliminar
    toast.info("Eliminado de favoritos", {
      description: name,
      duration: 2000,
    });
  };

  const handleMoveToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item.id);
    
    // Alerta combinada opcional al mover al carrito
    toast.success("Movido al carrito", {
      description: item.name,
      duration: 2000,
    });
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-8 py-10 pt-[var(--navbar-height)] select-none">
      <div className="mx-auto max-w-7xl">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-10">
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-1">
              Tus Favoritos
            </h3>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Lista de Deseos
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            {wishlist.length} {wishlist.length === 1 ? "artículo guardado" : "artículos guardados"}
          </p>
        </div>

        {/* CONTENIDO CONDICIONAL */}
        {wishlist.length === 0 ? (
          <div className="text-center py-24 px-4 rounded-3xl bg-zinc-950 border border-white/10 max-w-xl mx-auto my-12">
            <div className="text-5xl mb-4">💔</div>
            <h3 className="text-xl font-bold mb-2">Tu lista de deseos está vacía</h3>
            <p className="text-gray-400 text-sm mb-8">
              Explora nuestra tienda o personaliza tus propias prendas para guardarlas aquí.
            </p>
            <Link
              to="/Custom"
              className="inline-block px-8 py-3.5 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 text-sm uppercase tracking-wider"
            >
              Ir a Personalizar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Botón para eliminar con alerta integrada */}
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all"
                  title="Eliminar de favoritos"
                >
                  <FaTrash size={14} />
                </button>

                {/* Imagen */}
                <div className="relative w-full h-72 bg-zinc-900/50 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col justify-between flex-grow border-t border-white/5">
                  <div>
                    <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-white mb-6">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Mover al Carrito con alerta */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-500 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <FaShoppingCart className="text-gray-400 group-hover/btn:text-black transition-colors" size={14} />
                    <span>Mover al Carrito</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}