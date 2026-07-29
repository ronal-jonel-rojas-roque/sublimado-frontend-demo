import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

export const NoProducts = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-red-500 mb-4"
      >
        <FiAlertCircle size={64} />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">No se encontraron productos</h3>
      <p className="text-gray-400">Intenta ajustar tus filtros o busca otra categoría.</p>
    </motion.div>
  );
};