import { useEffect } from "react";
/* import type { AnimationStep } from "../../types/types"; */

interface Props {
  setAnimationStep: (
    step:
      | "idle"
      | "falling"
      | "uploading"
      | "approved"
      | "applied"
  ) => void;
  selectedModel: string | null;
}

export default function ScrollAnimationController({
  setAnimationStep,
  selectedModel,
}: Props) {
  useEffect(() => {
    let started = false;

    const onScroll = () => {
      if (started) return;

      // 🛑 Si no hay un modelo seleccionado, se frena la animación por scroll
      if (!selectedModel) return;

      const trigger = window.innerHeight * 0.4;

      if (window.scrollY > trigger) {
        started = true;

        setAnimationStep("falling");

        setTimeout(() => {
          setAnimationStep("uploading");
        }, 1200);

        setTimeout(() => {
          setAnimationStep("approved");
        }, 2400);

        setTimeout(() => {
          setAnimationStep("applied");
        }, 3300);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, [setAnimationStep, selectedModel]);

  return null;
}