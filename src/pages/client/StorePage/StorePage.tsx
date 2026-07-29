import { useState, useEffect } from 'react';
import ProductGrid from '../../../components/ProductGrid';
import { ProductSkeleton } from '../../../components/skeletons/ProductSkeleton';
import { FilterAccordion } from '../../../components/productos/FilterAccordion';
import { CATEGORY_FILTER_CONFIG } from '../../../data/data.filterConfig';
import { NoProducts } from '../../../components/productos/NoProducts';

export const StorePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [limit, setLimit] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('');

    // 1. Detectar si es móvil para cambiar el limite de productos por página
    useEffect(() => {
        const handleResize = () => {
            setLimit(window.innerWidth < 768 ? 6 : 10);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const skip = (currentPage - 1) * limit;
            const url = selectedCategory
                ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.products);
                setTotalProducts(data.total);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, limit, selectedCategory]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    const totalPages = Math.ceil(totalProducts / limit);

    return (
        <div className="gap-8 px-6 md:px-12 pt-24 bg-black min-h-screen">
            <div className="flex w-full h-10 items-center mb-8"></div>
            <h1 className="text-4xl font-bold uppercase">Todos los Productos</h1>
            <div className="flex flex-col md:flex-row gap-8 px-6 md:px-12 pt-24 bg-black min-h-screen">

                <aside className="w-full md:w-64">
                    <div className="bg-white/5 p-6 rounded-2xl border select-none border-white/10 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 uppercase text-white" >Categorías</h2>

                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`block w-full text-left font-semibold mb-2 ${selectedCategory === '' ? 'text-red-500' : 'text-gray-200'}`}
                        >
                            Ver Todo
                        </button>

                        {CATEGORY_FILTER_CONFIG.map((cat) => (
                            <FilterAccordion
                                key={cat.name}
                                category={cat}
                                onSelect={setSelectedCategory}
                                currentCategory={selectedCategory}
                            />
                        ))}
                    </div>
                </aside>

                <main className="flex-1">
                    {loading ? (
                        // Mostramos 10 skeletons si está cargando
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {Array.from({ length: limit }).map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <ProductGrid products={products} />

                            {/* Controles de Paginación */}
                            <div className="flex justify-center items-center gap-4 py-12">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <span className="text-white">Página {currentPage} de {totalPages}</span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    ) : (
                        <NoProducts />
                    )}
                </main>
            </div>
        </div>
    );
};