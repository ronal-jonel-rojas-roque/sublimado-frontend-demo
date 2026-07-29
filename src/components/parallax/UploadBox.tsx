import type { AnimationStep } from "../../types/types";

interface Props {
  animationStep: AnimationStep;
  onOpenModels: () => void;
}

const isUploadLocked = (step: AnimationStep) =>
  !["idle", "applied"].includes(step);

export default function UploadBox({
  animationStep,
  onOpenModels,
}: Props) {
  const isDisabled = isUploadLocked(animationStep);

  const uploadUI: Record<AnimationStep, React.ReactNode> = {
    idle: (
      <p className="text-slate-400">
        Haz click para elegir diseño
      </p>
    ),

    selecting: (
      <p className="text-slate-400">
        Selecciona producto primero
      </p>
    ),

    choosingColor: (
      <p className="text-slate-400">
        Ajustando color...
      </p>
    ),

    falling: (
      <div className="absolute top-4 animate-bounce text-2xl">
        🖼️
      </div>
    ),

    uploading: (
      <div className="flex flex-col items-center">
        <p className="text-white/70">Procesando...</p>

        <div className="mt-3 h-2 w-32 rounded bg-white/10 overflow-hidden">
          <div className="h-2 w-20 animate-pulse bg-cyan-500" />
        </div>
      </div>
    ),

    approved: (
      <p className="text-green-400 font-semibold">
        Diseño aprobado ✔
      </p>
    ),

    applied: (
      <p className="text-cyan-400 font-semibold">
        Diseño aplicado 🎉
      </p>
    ),
  };

  return (
    <div className="mb-6">
      <p className="mb-2 font-semibold text-white">
        Paso 3 · Subir diseño
      </p>

      <button
        type="button"
        onClick={() => {
          if (!isDisabled) onOpenModels();
        }}
        className={`
          relative h-36 w-full rounded-2xl border border-white/10 bg-white/5
          backdrop-blur-md transition
          flex items-center justify-center text-center
          ${!isDisabled
            ? "cursor-pointer hover:border-cyan-400/60"
            : "opacity-50 cursor-not-allowed"
          }
        `}
      >
        <div className="relative">
          {uploadUI[animationStep]}
        </div>
      </button>
    </div>
  );
}