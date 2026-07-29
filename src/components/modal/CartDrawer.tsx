import { FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { BiCheckSquare } from "react-icons/bi";
import { GitCommitHorizontalIcon, PlusIcon, SquareActivityIcon, SquareArrowDownIcon } from "lucide-animated";
import { BsCheckSquare, BsTrash2Fill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "sonner";
import type { CartItem } from "../../types/cart";
import { formatCurrency, getDiscountedPrice } from "../../utils/price";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, cartTotal, updateQuantity, removeFromCart, removeMultipleFromCart } = useCart();
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());


    // Lógica de Selección
    const toggleSelect = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === cart.length) setSelectedIds(new Set());
        else setSelectedIds(new Set(cart.map(item => item.id)));
    };

    const handleDeleteSelected = () => {
        if (selectedIds.size === 0) return;
        const count = selectedIds.size;
        removeMultipleFromCart(Array.from(selectedIds));
        toast.success(`Se eliminaron ${count} producto${count > 1 ? 's' : ''}`);
        setSelectedIds(new Set());
    };

    const handleRemoveSingle = (item: CartItem) => {
        removeFromCart(item.id);
        toast.info(`Se eliminó "${item.title}" del carrito`);
    };
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[60]"
                onClick={onClose}
            />
            <div
                className="fixed top-[88px] right-0 h-[calc(100vh-88px)] w-full sm:w-[600px] bg-black border-l border-white/10 z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Encabezado */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Tu Carrito ({cart.length})</h2>
                    <div className="flex gap-2">
                        {selectedIds.size > 0 && (
                            <button onClick={handleDeleteSelected} className="text-red-400 text-sm hover:underline">
                                Eliminar seleccionados ({selectedIds.size})
                            </button>
                        )}
                        <button onClick={onClose}><FaTimes size={20} className="text-white" /></button>
                    </div>
                </div>

                {/* Tabla de Productos */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center mt-10">Tu carrito está vacío</p>
                    ) : (
                        <>
                            {/* Header de la tabla */}
                            <div className="grid grid-cols-[30px_60px_1fr_100px_80px_40px] gap-3 pb-2 text-xs text-gray-500 uppercase font-bold border-b border-white/10 mb-4">
                                <button onClick={toggleSelectAll}>
                                    {selectedIds.size === cart.length ? <BsCheckSquare size={16} /> : <SquareArrowDownIcon size={16} />}
                                </button>
                                <span>Foto</span>
                                <span>Producto</span>
                                <span>Cant</span>
                                <span>Total</span>
                                <span></span>
                            </div>

                            {/* Lista */}
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="grid grid-cols-[30px_60px_1fr_100px_80px_40px] gap-3 items-center border-b border-white/5 pb-2">
                                        <button onClick={() => toggleSelect(item.id)}>
                                            {selectedIds.has(item.id) ? <BiCheckSquare size={18} className="text-blue-500" /> : <SquareActivityIcon size={18} />}
                                        </button>
                                        <img src={item.thumbnail} className="w-12 h-12 object-cover rounded" />
                                        <h3 className="text-white text-sm truncate">{item.title}</h3>
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => updateQuantity(item.id, -1)}><GitCommitHorizontalIcon size={14} /></button>
                                            <span className="w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}><PlusIcon size={14} /></button>
                                        </div>
                                        <span className="text-white text-sm">
                                            {formatCurrency(getDiscountedPrice(item.price, item.discountPercentage) * item.quantity)}
                                        </span>                                    <button
                                            onClick={() => handleRemoveSingle(item)}
                                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-full transition"
                                        >
                                            <BsTrash2Fill size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black">
                    <button className="w-full bg-white text-black py-3 rounded-full font-bold">
                        Total: {formatCurrency(cartTotal)}
                    </button>
                </div>
            </div>
        </>
    );
}