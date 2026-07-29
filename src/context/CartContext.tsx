import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import type { CartItem, CartContextType } from "../types/cart";
import { getDiscountedPrice } from "../utils/price";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const cartTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const price = getDiscountedPrice(item.price, item.discountPercentage || 0);
            return acc + (price * item.quantity);
        }, 0);
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };
    const removeMultipleFromCart = (ids: number[]) => {
        setCart((prev) => prev.filter((item) => !ids.includes(item.id)));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, cartTotal, addToCart, removeFromCart, updateQuantity, removeMultipleFromCart, clearCart, isCartOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};