import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed, ShoppingCart, TrendingUp } from 'lucide-react';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-32 h-32 bg-gradient-to-br from-mint/20 to-mint/5 rounded-full flex items-center justify-center mb-6"
      >
        <UtensilsCrossed size={64} className="text-mint" />
      </motion.div>

      <h3 className="text-2xl font-bold text-navy mb-3">
        ¡Tu plan nutricional te espera!
      </h3>

      <p className="text-gray-500 mb-8 max-w-xs">
        Sube tu pauta personalizada y comenzaremos a crear tu lista de compras optimizada para ti.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm"
        >
          <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center mb-2">
            <UtensilsCrossed size={20} className="text-mint" />
          </div>
          <span className="text-xs font-medium text-gray-600">Subir pauta</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm"
        >
          <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center mb-2">
            <Sparkles size={20} className="text-mint" />
          </div>
          <span className="text-xs font-medium text-gray-600">Analizar macros</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm"
        >
          <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center mb-2">
            <ShoppingCart size={20} className="text-mint" />
          </div>
          <span className="text-xs font-medium text-gray-600">Comprar</span>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-mint/10 to-navy/10 rounded-xl max-w-sm">
        <div className="flex items-center gap-3">
          <TrendingUp size={24} className="text-mint" />
          <p className="text-sm text-gray-600">
            <strong className="text-navy">Ahorro estimado:</strong> Hasta $15.000 semanales con nuestra optimización de compras
          </p>
        </div>
      </div>
    </motion.div>
  );
}
