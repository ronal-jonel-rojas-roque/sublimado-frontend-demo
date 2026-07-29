import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  models: string[];
  onClose: () => void;
  onSelect: (img: string) => void;
}

export default function ModelSelectorModal({
  open,
  models,
  onClose,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [folder, setFolder] = useState<"all" | "fav" | "recent">("all");

  // aquí guardamos el tipo real de imagen por URL
  const [types, setTypes] = useState<Record<string, string>>({});

  // 🔥 Detectar tipos reales de imagen
  useEffect(() => {
    let isMounted = true;

    const loadTypes = async () => {
      const results: Record<string, string> = {};

      await Promise.all(
        models.map(async (url) => {
          try {
            const res = await fetch(url);
            const blob = await res.blob();

            const type = blob.type?.split("/")[1] || "unknown";
            results[url] = type;
          } catch (err) {
            results[url] = "unknown";
          }
        })
      );

      if (isMounted) {
        setTypes(results);
      }
    };

    loadTypes();

    return () => {
      isMounted = false;
    };
  }, [models]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      {/* WINDOW */}
      <div className="w-[1000px] h-[600px] bg-[#1e1e1e] text-white rounded-xl shadow-2xl flex overflow-hidden border border-white/10">

        {/* SIDEBAR */}
        <div className="w-[220px] bg-[#252526] border-r border-white/10 p-3">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
            Acceso rápido
          </p>

          <div className="space-y-1 text-sm">
            <button
              onClick={() => setFolder("all")}
              className={`w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
                folder === "all" ? "bg-white/10" : ""
              }`}
            >
              📁 Todos los archivos
            </button>

            <button
              onClick={() => setFolder("fav")}
              className={`w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
                folder === "fav" ? "bg-white/10" : ""
              }`}
            >
              ⭐ Favoritos
            </button>

            <button
              onClick={() => setFolder("recent")}
              className={`w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
                folder === "recent" ? "bg-white/10" : ""
              }`}
            >
              🕒 Recientes
            </button>
          </div>
        </div>

        {/* CENTER FILE LIST */}
        <div className="flex-1 flex flex-col">
          {/* TOP BAR */}
          <div className="h-10 border-b border-white/10 flex items-center px-4 text-xs text-gray-400">
            Explorador de archivos
          </div>

          {/* FILE LIST */}
          <div className="flex-1 overflow-auto p-2">
            {models.map((m, i) => {
              const isSelected = selected === m;
              const format = types[m] ?? "...";

              return (
                <div
                  key={m}
                  onClick={() => setSelected(m)}
                  className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer select-none
                  ${isSelected ? "bg-blue-600/60" : "hover:bg-white/10"}`}
                >
                  <div className="text-lg">🖼️</div>

                  <div className="text-sm truncate">
                    Diseño_{i + 1}.{format}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[260px] bg-[#252526] border-l border-white/10 p-4 flex flex-col">
          <p className="text-xs text-gray-400 mb-3 uppercase">
            Detalles
          </p>

          {selected ? (
            <>
              <img
                src={selected}
                className="rounded-md mb-4 border border-white/10"
              />

              <div className="text-xs text-gray-400 mb-2">
                Archivo seleccionado
              </div>

              <div className="text-sm mb-4 break-all">
                {selected}
              </div>

              <button
                onClick={() => onSelect(selected)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
              >
                Seleccionar
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Selecciona un archivo para ver detalles
            </p>
          )}

          <button
            onClick={onClose}
            className="mt-auto text-xs text-gray-400 hover:text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}