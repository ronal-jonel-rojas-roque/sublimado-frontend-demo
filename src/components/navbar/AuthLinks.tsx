import { Link } from "react-router-dom";

interface AuthLinksProps {
  isAuthenticated: boolean;
  logout: () => void;
  isMobile?: boolean;
}

export default function AuthLinks({ isAuthenticated, logout, isMobile = false }: AuthLinksProps) {
  return (
    <ul className={`text-sm ${isMobile ? 'flex flex-col items-start gap-4' : 'py-2'}`}>
      {isAuthenticated ? (
        <>
          <li className={!isMobile ? "px-4 py-2 hover:bg-gray-700" : ""}>
            <Link to="/profile">👤 Mi Perfil</Link>
          </li>
          <li className={!isMobile ? "px-4 py-2 hover:bg-gray-700" : ""}>
            <Link to="/orders">📦 Mis Compras</Link>
          </li>
          <li className={!isMobile ? "px-4 py-2 hover:bg-gray-700" : ""}>
            <button onClick={logout} className="text-red-400">Salir</button>
          </li>
        </>
      ) : (
        <>
          <li className={!isMobile ? "px-4 py-2 hover:bg-gray-700" : ""}>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li className={!isMobile ? "px-4 py-2 hover:bg-gray-700" : ""}>
            <Link to="/register">Registrarse</Link>
          </li>
        </>
      )}
    </ul>
  );
}