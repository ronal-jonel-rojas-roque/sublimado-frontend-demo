import { useMemo, useRef, useState } from "react";
import { useProducts } from "./useProducts";
import { CategoryHero } from "../header-products/CategoryHero";
import ProductGrid from "../ProductGrid";
import { SkeletonGrid } from "../skeletons/ProductSkeleton";

interface Props {
    gender: "Hombres" | "Mujeres";
    description: string;
    images: string[];
    categories: string[];
    onExplore: () => void;
}

export default function ProductCategoryPage({
    gender,
    description,
    images,
    categories,
    onExplore
}: Props) {
    const { products, loading } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsRef = useRef<HTMLDivElement>(null);
    const productsPerPage = 10;

    // Filtrado de productos basado en categorías
    const filteredProducts = useMemo(() => {
        return products.filter((product) => categories.includes(product.category));
    }, [products, categories]);

    //  Lógica de paginación
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTimeout(() => {
            productsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 30)
    };

    // 4. Estado de carga (Skeleton)
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <SkeletonGrid count={8} />
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col min-h-screen bg-black">
            <CategoryHero 
                gender={gender} 
                description={description} 
                images={images} 
                onExplore={onExplore}
            />

            <div ref={productsRef} className="container mx-auto px-4 py-8 min-h-[500px]">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-white">
                        <h2 className="text-2xl font-bold">No hay productos en esta categoría</h2>
                        <p className="text-gray-400 mt-2">Intenta con otra selección.</p>
                    </div>
                ) : (
                    <>
                        <ProductGrid products={currentProducts} />

                        {/* Paginación */}
                        <div className="flex justify-center items-center gap-2 py-12">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                                Anterior
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
                                        currentPage === index + 1 
                                        ? "bg-white text-black font-bold" 
                                        : "bg-white/10 text-white hover:bg-white/20"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}