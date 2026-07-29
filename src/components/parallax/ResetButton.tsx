interface Props {
  onReset: () => void;
}

export default function ResetButton({ onReset }: Props) {
  return (
    <button
      onClick={onReset}
      className="mt-4 w-full py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold transition text-slate-300 hover:text-white flex items-center justify-center gap-2"
    >
      🔄 Reiniciar personalización
    </button>
  );
}