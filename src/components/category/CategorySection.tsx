import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-animated';
import { useEffect, useRef } from 'react';
import { CATEGORY_IMG_CONFIG  } from '../../data/data.categories';

export const CategorySection = () => {
   const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrollAmount = clientWidth * 0.7;

        if (direction === 'right') {
            // Si estamos al final, volvemos al inicio (0)
            if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
                scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        } else {
            // Si estamos al inicio y damos a "atrás", vamos al final
            if (scrollLeft <= 0) {
                scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            scroll('right');
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    return (
        <section className="px-10 py-10 bg-black relative group">
            <h2 className="text-2xl font-bold mb-6 text-white mb-6 uppercase font-italica">Explora Categorías</h2>

            <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-[55%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                <ChevronLeftIcon size={24} />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-[55%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                <ChevronRightIcon size={24} />
            </button>

            <div
                ref={scrollRef}
                className="flex overflow-x-hidden bg-transparent scroll-smooth gap-4 py-10"
            >
                {CATEGORY_IMG_CONFIG.map((cat, idx) => (
                    <div
                        key={idx}
                        className="flex-[0_0_33%] md:flex-[0_0_20%] lg:flex-[0_0_14.28%] min-w-0 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                        <div className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-800 shadow-lg">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium mt-3 text-center truncate w-full">
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};