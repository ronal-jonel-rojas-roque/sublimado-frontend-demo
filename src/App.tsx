import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import ClientHome from './pages/ClientHome';
import ProtectedRoute from './components/ProtectedRoute';
import Men from './pages/client/Men/Men';
import Women from './pages/client/Women/Women';
import Custom from './pages/client/Custom/Custom';
import { MainLayout } from './components/layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import ProductDetail from './pages/client/ProductDetail';
import Wishlist from './components/productos/Wishlist';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'sonner';
import { StorePage } from './pages/client/StorePage/StorePage'; 
import NotFound from './components/notfound/NotFound';
import About from './pages/client/Contact/About';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
      <CartProvider>
        <WishlistProvider>
            <ScrollToTop />
            <Routes>

              {/* RUTAS DE AUTENTICACIÓN */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* RUTAS DE ADMINISTRADOR */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* RUTAS DE CLIENTE */}
              <Route
                element={
                  <MainLayout />}>
                <Route path="/" element={<ClientHome />} />
                <Route path="/Storagepage" element={<StorePage />} />
                <Route path="/Men" element={<Men />} />
                <Route path="/Women" element={<Women />} />
                <Route path="/Custom" element={<Custom />} />
                <Route path="/About" element={<About />} />
                <Route
                  path="/product/:id"
                  element={<ProductDetail />}
                />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>


              <Route path="*" element={<NotFound />} />

            </Routes>
            <Toaster position="bottom-right" richColors />
          
        </WishlistProvider>
      </CartProvider>
  );
}

export default App;