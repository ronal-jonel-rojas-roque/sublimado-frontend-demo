import ProductSelector from "./ProductSelector";
import ColorPalette from "./ColorPalette";
import UploadBox from "./UploadBox";
import ApprovedDesign from "./ApprovedDesign";
import type { AnimationStep, ColorType, ProductType } from "../../types/types";

interface Props {
  product: ProductType;
  setProduct: (p: ProductType) => void;
  color: ColorType;
  setColor: (c: ColorType) => void;
  animationStep: AnimationStep;
  selectedModel: string | null;
  setSelectedModel: (img: string) => void;
  setOpenModal: (open: boolean) => void;
  content: {
    title: string;
    description: string;
  };
}

export default function CustomWizard({
  product,
  setProduct,
  color,
  setColor,
  animationStep,
  selectedModel,
  /*  setSelectedModel, */
  setOpenModal,
  /* content, */
}: Props) {

  return (
    <div className="rounded-3xl bg-zinc-950 border border-white/10 p-6 shadow-2xl">
      <h3 className="mb-6 text-2xl font-bold text-white">
        Personalización
      </h3>

      <ProductSelector
        product={product}
        setProduct={setProduct}
      />

      <ColorPalette
        color={color}
        setColor={setColor}
      />

      <UploadBox
        animationStep={animationStep}
        onOpenModels={() => setOpenModal(true)}
      />

      <ApprovedDesign
        animationStep={animationStep}
        selectedModel={selectedModel}
      />
    </div>
  );
}