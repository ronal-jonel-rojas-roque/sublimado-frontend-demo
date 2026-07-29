import { useEffect, useState } from 'react';
import { carouselData } from '../../data/data.carousel';

export const CircularCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = carouselData.length;

    const [radius, setRadius] = useState(250);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setRadius(150);
            } else {
                setRadius(250);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Ejecutar al inicio

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => setActiveIndex((prev) => (prev + 1) % total);
    const handleNext = () => setActiveIndex((prev) => (prev - 1 + total) % total);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white">
            <div
                className="absolute inset-0 bg-cover bg-center md:bg-right transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${carouselData[activeIndex].imageSrc2})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Contenido Izquierda */}
            <div className="relative z-10 flex items-center h-full">

                <div
                    className="
                            ml-20
                            max-w-xl
                            p-8
                            rounded-2xl
                            bg-black/20
                            backdrop-blur-md
                            border border-white/10
      "
                >
                    <h1 className="text-7xl text-accent-dark font-bold uppercase mb-6">
                        {carouselData[activeIndex].title}
                    </h1>

                    <p className="text-xl text-gray-200">
                        {carouselData[activeIndex].description}
                    </p>
                </div>

            </div>

            {/* Contenedor del Carrusel Orbital */}
            <div className="absolute top-[60%] md:top-1/2 right-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                {carouselData.map((item, index) => {

                    const angle = ((index - activeIndex) * (360 / total)) * (Math.PI / 180);
                    const x = Math.sin(angle) * radius;
                    const y = Math.cos(angle) * radius;
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={item.id}
                            className="absolute transition-all duration-700 ease-in-out"
                            style={{
                                right: `calc(-20% + ${x}px)`,
                                bottom: `calc(-30% + ${y}px)`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: isActive ? 20 : 30,
                            }}
                        >
                            <button
                                onClick={() => setActiveIndex(index)}
                                className={`transition-all duration-500 rounded-full border-4 overflow-hidden
                  ${isActive
                                        ? 'w-28 h-28 md:w-48 md:h-48 border-white shadow-2xl scale-110 opacity-100'
                                        : 'w-20 h-20 md:w-40 md:h-40 border-gray-600 opacity-50 hover:opacity-80 scale-90'
                                    }`}
                            >
                                <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Botones de control */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-4">
                <button onClick={handlePrev} className="p-4 bg-white/20 rounded-full hover:bg-white/40 transition">←</button>
                <button onClick={handleNext} className="p-4 bg-white/20 rounded-full hover:bg-white/40 transition">→</button>
            </div>
        </div>
    );
};