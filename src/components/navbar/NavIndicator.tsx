import { motion } from "framer-motion";

export default function NavIndicator() {
  return (
    <motion.div
      layoutId="pill-indicator"
      className="
        absolute inset-0 
        z-0 
        rounded-full 
        bg-red-600      
        shadow-[0_0_15px_rgba(220,38,38,0.5)]
      "
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      style={{
        zIndex: -1,
      }}
    />
  );
};