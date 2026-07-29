import { HeroCarousel } from './HeroCarousel';

export default function HeroSlide() {
    return (
        <section className="px-10 py-6">
            <div className="text-2xl font-bold text-center mb-4 py-10">
                <h1 style={{ color: "var(--color-accent)" }}>

                    DISFUTA DE NUESTRAS OFERTAS EXCLUSIVAS EN PRODUCTOS DE SUBLIMACIÓN</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-2">
                    <HeroCarousel />
                </div>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:flex lg:flex-col">
                    <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto">
                        <img
                           src={`${import.meta.env.BASE_URL}banners/banner1.jpg`}
                            className="w-full h-full object-cover object-center"
                            alt="Oferta 1"
                        />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden min-h-[200px]">
                        <img
                            src={`${import.meta.env.BASE_URL}banners/banner2.jpg`}
                            className="w-full h-full object-cover object-center"
                            alt="Oferta 2"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};