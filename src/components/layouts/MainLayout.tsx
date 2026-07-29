// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Footer } from '../footer/Footer';
import WhatsAppWidget from '../whatssap/WhatsAppWidget';
import CartDrawer from '../modal/CartDrawer';
import { useCart } from '../../context/CartContext';

export const MainLayout = () => {

  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Navbar />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <main>
        <Outlet /> 
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
};