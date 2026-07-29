import { useState } from "react";

import CustomWizard from "../../../components/parallax/CustomWizard";
import ProductViewer from "../../../components/parallax/ProductViewer";
import ScrollAnimationController from "../../../components/parallax/ScrollAnimationController";
import ModelSelectorModal from "../../../components/modal/ModelSelectorModal";
import ResetButton from "../../../components/parallax/ResetButton";

import {
  getStepContent,
  type AnimationStep,
  type ColorType,
  type ProductType,
} from "../../../types/types";

import model1 from "../../../assets/parallax/model1.webp";
import model2 from "../../../assets/parallax/model2.webp";
import model3 from "../../../assets/parallax/model3.webp";

export default function CustomExperience() {
  const [product, setProduct] = useState<ProductType>("shirt");
  const [color, setColor] = useState<ColorType>("white");

  const [animationStep, setAnimationStep] =
    useState<AnimationStep>("idle");

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const models = [model1, model2, model3];
  const content = getStepContent(animationStep, color);

  const runAnimation = async (img: string) => {
    setSelectedModel(img);
    setOpenModal(false);

    const steps: AnimationStep[] = [
      "falling",
      "uploading",
      "approved",
      "applied",
    ];

    for (const step of steps) {
      setAnimationStep(step);
      await new Promise((r) => setTimeout(r, 800));
    }
  };

  const handleReset = () => {
    setProduct("shirt");
    setColor("white");
    setAnimationStep("idle");
    setSelectedModel(null);
    setOpenModal(false);
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 md:px-8 py-10 pt-[var(--navbar-height)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-8 mt-10 select-none">

        {/* PANEL WIZARD */}
        <div className="col-span-3 flex flex-col justify-between">
          <CustomWizard
            product={product}
            setProduct={setProduct}
            color={color}
            setColor={setColor}
            animationStep={animationStep}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            setOpenModal={setOpenModal}
            content={content} 
          />

          <ResetButton onReset={handleReset} />
        </div>

        {/* VIEWER 3D / PRODUCTO */}
        <div className="col-span-6 flex items-center justify-center">
          <ProductViewer
            product={product}
            color={color}
            animationStep={animationStep}
            selectedModel={selectedModel}
          />
        </div>

        {/* TEXTO DINÁMICO */}
        <div className="col-span-3 flex flex-col justify-center">
          <div className="transition-all duration-500 ease-out">
            <h2 className="uppercase mb-6 text-4xl font-bold animate-[fadeIn_0.4s_ease-out_forwards]">
              {content.title}
            </h2>
            <p className="text-lg text-gray-400 leading-8 animate-[fadeIn_0.4s_ease-out_forwards]">
              {content.description}
            </p>
          </div>
        </div>

        {/* CONTROL DE SCROLL */}
        <ScrollAnimationController
          setAnimationStep={setAnimationStep}
          selectedModel={selectedModel}
        />
      </div>

      {/* MODAL */}
      <ModelSelectorModal
        open={openModal}
        models={models}
        onClose={() => setOpenModal(false)}
        onSelect={runAnimation}
      />
    </section>
  );
}