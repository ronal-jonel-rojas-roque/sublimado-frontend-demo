import type { ProductType } from "../../types/types";


interface Props {
  product: ProductType;
  setProduct: (p: ProductType) => void;
}

export default function ProductSelector({
  product,
  setProduct,
}: Props) {
  const options = [
  { id: "shirt", label: "👕 Camiseta" },
  { id: "cap", label: "🧢 Gorra" },
  { id: "kit", label: "🎽 Conjunto" },
];

  return (
    <div className="mb-6">
      <p className="mb-3 font-semibold">
        Paso 1 · Elegir producto
      </p>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
  <button
    key={opt.id}
    onClick={() => setProduct(opt.id as ProductType)}
    className={`rounded-xl border p-3 transition text-sm
      ${
        product === opt.id
          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md"
          : "border-white/10 hover:bg-white/5 text-white/70"
      }`}
  >
    {opt.label}
  </button>
))}
      </div>
    </div>
  );
}