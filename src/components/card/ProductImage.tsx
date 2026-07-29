import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function ProductImage({
  src,
  alt,
}: Props) {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 25;

    const rotateX =
      -((y / rect.height) - 0.5) * 25;

    setRotation({
      x: rotateX,
      y: rotateY,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setRotation({ x: 0, y: 0 })
      }
      className="
        relative
        h-60
        flex
        items-center
        justify-center
        perspective-[1000px]
      "
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale:
            rotation.x !== 0 ||
              rotation.y !== 0
              ? 1.08
              : 1,
          y:
            rotation.x !== 0 ||
              rotation.y !== 0
              ? -10
              : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        style={{
          transformStyle:
            "preserve-3d",
        }}
        className="
          max-w-[220px]
          h-52
          object-contain
          drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]
        "
      />
    </div>
  );
}