import type { ColorType } from "../../types/types";

const colors: { id: ColorType; value: string }[] = [
  { id: "white", value: "#ffffff" },   // Primero blanco
  { id: "black", value: "#000000" },   // Segundo negro
  { id: "orange", value: "#ff7a00" },  // Tercero anaranjado
  { id: "blue", value: "#1d8df0" },    // Cuarto azul
];
interface Props {
  color: ColorType;
  setColor: (c: ColorType) => void;
}

export default function ColorPalette({
  color,
  setColor,
}: Props) {
  return (
    <div className="mb-6">
      <p className="mb-3 font-semibold"> Paso 2 · Elegir color </p>

      <div className="flex gap-4">
        {colors.map((c) => (
          <button
            key={c.id}
            onClick={() => setColor(c.id)}
            className={`
              h-12 w-12 rounded-full transition
              border-2 border-white
              transform hover:scale-110
              ${color === c.id
                ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black"
                : ""
              }
            `}
            style={{
              background: c.value,
              boxShadow: "0 0 15px rgba(0,0,0,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}