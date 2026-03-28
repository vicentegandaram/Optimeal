import { motion } from 'framer-motion';
import { Sparkles, ChefHat, ShoppingCart } from 'lucide-react';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-32 h-32 bg-gradient-to-br from-mint/20 to-mint/5 rounded-full flex items-center justify-center mb-8"
      >
        <ChefHat size={64} className="text-mint" />
      </motion.div>

      <h3 className="text-2xl font-bold text-navy mb-3">
        ¡Tu plan nutricional te espera!
      </h3>

      <p className="text-gray-500 mb-8 max-w-xs">
        Ingresa las pautas de tu nutricionista o genera un plan sugerido para comenzar.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-sm mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm"
        >
          <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center mb-2">
            <Sparkles size={24} className="text-mint" />
          </div>
          <span className="text-sm font-medium text-gray-600 text-center">Magic Sync</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm"
        >
          <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center mb-2">
            <ChefHat size={24} className="text-mint" />
          </div>
          <span className="text-sm font-medium text-gray-600 text-center">Recetas</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm"
        >
          <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center mb-2">
            <ShoppingCart size={24} className="text-mint" />
          </div>
          <span className="text-sm font-medium text-gray-600 text-center">Compras</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-gradient-to-r from-mint/10 to-navy/10 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Sparkles size={24} className="text-mint mt-1" />
            <div>
              <p className="font-semibold text-navy mb-1">Ahorro estimado</p>
              <p className="text-sm text-gray-600">
                Hasta <span className="text-mint font-bold">$15.000 semanales</span> con nuestra optimización de compras en Jumbo y Líder
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
