import { useNavigate } from 'react-router-dom';
import DragonBackground from './DragonBackground';
import FaceAnimation from './FaceAnimation';

const NotFound = () => {

    const navigate = useNavigate();
    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        };
    }
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 1. Fondo: El Dragón (Z-index bajo) */}
            <div className="absolute inset-0 z-0">
                <DragonBackground />
            </div>

            {/* 2. Frente: La cara del 404 (Z-index alto) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <FaceAnimation />
            </div>
            <button
                onClick={handleGoBack}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 
                   px-6 py-2 bg-transparent border border-white text-white 
                   hover:bg-white hover:text-black transition-all cursor-pointer"
            >
                VOLVER ATRÁS
            </button>
        </div>
    );
};

export default NotFound;

