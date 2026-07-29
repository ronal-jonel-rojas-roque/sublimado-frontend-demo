import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole: 'admin' | 'cliente';
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to="/login" replace />;
    if (role !== allowedRole) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;