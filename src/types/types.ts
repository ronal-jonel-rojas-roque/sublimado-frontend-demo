export type ProductType = "shirt" | "cap" | "kit";

export type ColorType = "blue" | "white" | "orange" | "black";

export type AnimationStep =
  | "idle"
  | "selecting"
  | "choosingColor"
  | "falling"
  | "uploading"
  | "approved"
  | "applied";

export const stepContent = {
  idle: {
    title: "Tu eliges tu prenda",
    description:
      "¿Quieres dar vida a alguna prenda en específico con nosotros? Tú lo eliges.",
  },

  selecting: {
    title: "Tu eliges el producto",
    description:
      "Selecciona la prenda que mejor se adapte a tu estilo y comienza a crear.",
  },

  choosingColor: {
    title: "Tu eliges el color",
    description:
      "Nosotros nos encargamos del resto para que tu diseño cobre vida.",
  },

  falling: {
    title: "Preparando tu diseño",
    description:
      "Estamos colocando tu creación en la prenda seleccionada.",
  },

  uploading: {
    title: "Sube tu diseño",
    description:
      "Deja volar tu imaginación, nosotros lo hacemos realidad.",
  },

  approved: {
    title: "Diseño aprobado",
    description:
      "Tu diseño ha sido validado y está listo para aplicarse.",
  },

  applied: {
    title: "Tu diseño cobra vida",
    description:
      "Así se ve tu creación en el mundo real. Lista para producirse.",
  },
} satisfies Record<AnimationStep, { title: string; description: string }>;



export const colorStepContent: Record<
  ColorType,
  { title: string; description: string }
> = {
  blue: {
    title: "Azul energético",
    description: "Un color que transmite tecnología, frescura y modernidad.",
  },

  white: {
    title: "Blanco minimalista",
    description: "Pureza total. Ideal para diseños limpios y elegantes.",
  },

  orange: {
    title: "Naranja vibrante",
    description: "Energía pura. Perfecto para destacar y llamar la atención.",
  },

  black: {
    title: "Negro premium",
    description: "Elegancia absoluta. Un acabado fuerte y sofisticado.",
  },
};


export function getStepContent(step: AnimationStep, color: ColorType) {
  if (step === "idle") {
    return {
      ...stepContent.idle,
      ...colorStepContent[color],
    };
  }

  if (step === "choosingColor") {
    return colorStepContent[color];
  }

  return stepContent[step];
}