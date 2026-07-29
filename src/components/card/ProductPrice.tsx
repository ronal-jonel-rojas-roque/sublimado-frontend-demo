import { calculateOriginalPrice, formatCurrency } from "../../utils/price";

interface ProductPriceProps {
  price: number;
  discountPercentage?: number;
}

export default function ProductPrice({ price, discountPercentage = 0 }: ProductPriceProps) {
  const hasDiscount = discountPercentage > 0;
  const originalPrice = calculateOriginalPrice(price, discountPercentage);

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      {/* Precio Final */}
      <span className="text-lg font-bold text-white">
        {formatCurrency(price)}
      </span>

      {/* Precio Original (Tachado) */}
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">
          {formatCurrency(originalPrice)}
        </span>
      )}

      {/* Etiqueta de Descuento */}
      {hasDiscount && (
        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
          -{Math.round(discountPercentage)}%
        </span>
      )}
    </div>
  );
}