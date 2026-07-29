import type { AnimationStep } from "../../types/types";

interface Props {
  animationStep: AnimationStep;
  selectedModel: string | null;
}

export default function ApprovedDesign({
  animationStep,
  selectedModel,
}: Props) {
  const isActive =
    animationStep === "approved" || animationStep === "applied";

  return (
    <div className="rounded-xl bg-slate-100 p-4 text-center">
      {isActive ? (
        <>
          {selectedModel ? (
            <img
              src={selectedModel}
              alt="Diseño aprobado"
              className="mx-auto mb-2 h-24 w-24 rounded-lg object-cover"
            />
          ) : (
            <div className="mx-auto mb-2 h-24 w-24 rounded-lg bg-slate-200" />
          )}

          <p className="text-sm font-semibold text-green-600">
            ✓ Diseño aprobado
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          Esperando el diseño…
        </p>
      )}
    </div>
  );
}