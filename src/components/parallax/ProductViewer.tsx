import { useState, useEffect } from "react";
import type { AnimationStep, ColorType, ProductType } from "../../types/types";
import { baseImages, finishImages } from "./productImages";

interface Props {
  product: ProductType;
  color: ColorType;
  animationStep: AnimationStep;
  selectedModel?: string | null;
}

export default function ProductViewer({
  product,
  color,
  animationStep,
  selectedModel,
}: Props) {
  const [image, setImage] = useState<string>(baseImages.shirt.white);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    let resolvedImage = baseImages[product]?.[color] || baseImages.shirt.white;
    const isFinished = animationStep === "applied" || animationStep === "approved";

    if (isFinished && selectedModel) {
      const cleanModel = selectedModel.includes("model1")
        ? "model1"
        : selectedModel.includes("model2")
        ? "model2"
        : "model3";

      const key = `${product}-${color}-${cleanModel}`;

      if (finishImages[key]) {
        resolvedImage = finishImages[key];
      } else {
        setHasError(true);
      }
    }

    const timer = setTimeout(() => {
      setImage(resolvedImage);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [product, color, animationStep, selectedModel]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative flex h-[700px] w-full items-center justify-center">
        <div className="absolute bottom-20 h-8 w-72 rounded-full bg-black/10 blur-xl" />

        {isLoading && (
          <div className="absolute z-20 flex items-center justify-center inset-0 bg-black/40 backdrop-blur-xs rounded-2xl transition-all">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          </div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl h-[400px] w-[300px]">
            <span className="text-3xl mb-2">⚠️</span>
            <p className="text-sm font-semibold text-white/80">
              Combinación no disponible
            </p>
            <p className="text-xs text-slate-400 mt-1">
              No existe una vista previa para este color y modelo con este producto.
            </p>
          </div>
        ) : (
          <img
            key={image}
            src={image}
            alt={product}
            className={`
              max-h-[700px] w-auto object-contain transition-all duration-700 ease-in-out
              ${isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}
          />
        )}
      </div>

      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}