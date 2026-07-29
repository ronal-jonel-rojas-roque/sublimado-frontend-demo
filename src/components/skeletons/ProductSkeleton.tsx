export function ProductSkeleton() {
    return (
        <>
            <div className="rounded-3xl border border-white/10 mt-8 bg-white/5 p-6 animate-pulse">
                {/* Imagen Skeleton */}
                <div className="h-64 bg-white/10 rounded-2xl mb-4 w-full" />

                {/* Título y Precio Skeleton */}
                <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-8 bg-white/10 rounded-full w-full mt-4" />
                </div>
            </div>
        </>

    );
}

export function SkeletonGrid({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}