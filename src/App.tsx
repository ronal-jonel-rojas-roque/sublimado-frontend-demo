import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Vistas críticas e imprescindibles (Eager Loading para entrada rápida)
import ClientHome from './pages/ClientHome';
import { MainLayout } from './components/layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from 'sonner';
import { usePageTitle } from './components/hooks/usePageTitle';

// 2. Vistas pesadas o secundarias (Lazy Loading / Code Splitting)
const Custom = lazy(() => import('./pages/client/Custom/Custom')); // Carga el motor 3D/Three.js solo al entrar aquí
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const StorePage = lazy(() => import('./pages/client/StorePage/StorePage').then(m => ({ default: m.StorePage })));
const ProductDetail = lazy(() => import('./pages/client/ProductDetail'));
const Men = lazy(() => import('./pages/client/Men/Men'));
const Women = lazy(() => import('./pages/client/Women/Women'));
const About = lazy(() => import('./pages/client/Contact/About'));
const Wishlist = lazy(() => import('./components/productos/Wishlist'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const NotFound = lazy(() => import('./components/notfound/NotFound'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// Componente simple de carga (Skeleton / Spinner)
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black text-white">
    <div className="animate-pulse font-semibold text-lg">Cargando DALLT...</div>
  </div>
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  usePageTitle();

  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />
        
        {/* Envolver en Suspense para manejar las cargas diferidas */}
        <Suspense fallback={<PageLoader />}>
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
            <Route element={<MainLayout />}>
              <Route path="/" element={<ClientHome />} />
              <Route path="/Storagepage" element={<StorePage />} />
              <Route path="/Men" element={<Men />} />
              <Route path="/Women" element={<Women />} />
              
              {/* Esta ruta solo descargará los ~890 KB de Three.js cuando el usuario dé clic */}
              <Route path="/Custom" element={<Custom />} />
              
              <Route path="/About" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Toaster position="bottom-right" richColors />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;