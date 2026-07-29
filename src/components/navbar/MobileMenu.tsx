import { Link } from "react-router-dom";
import { navLinks } from "../../types/navLinks";
import { useAuth } from "../../context/AuthContext";


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const { isAuthenticated, logout } = useAuth();


  const mainLinks = navLinks.filter((link) => link.name !== "Mi perfil");
  return (
    <div
      className={`
        fixed top-[80px]
        inset-y-0 right-0
        z-40
        w-64
        bg-black/90
        backdrop-blur-md
        border-l border-white/10
        transform transition-transform
        duration-500 ease-in-out
        ${isOpen
          ? "translate-x-0"
          : "translate-x-full"}
      `}
    >
      <div className="p-6 flex flex-col h-full justify-between">
        {/* ENLACES PRINCIPALES */}
        <ul className="flex flex-col gap-8 mt-10">
          {mainLinks.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onClose}
                className="text-white uppercase tracking-widest hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* BLOQUE DE AUTH AL FINAL */}
        <div className="border-t border-white/10 pt-8 pb-10 justify-center text-center flex flex-col gap-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/Profile"
                onClick={onClose}
                className="text-white uppercase tracking-widest hover:text-gray-300 transition-colors"
              >
                Mi Perfil
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-red-400 uppercase tracking-widest text-center hover:text-red-300 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="text-white uppercase tracking-widest hover:text-gray-300 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="text-gray-400 uppercase tracking-widest hover:text-white transition-colors text-sm"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}