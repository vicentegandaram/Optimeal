import { motion } from 'framer-motion';
import { ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const steps = [
  { icon: ShoppingCart, text: 'Conectando con Jumbo...', subtext: 'Obteniendo precios actualizados' },
  { icon: Package, text: 'Sincronizando Líder...', subtext: 'Comparando inventario' },
  { icon: TrendingUp, text: 'Optimizando tu lista...', subtext: 'Ahorro estimado: $12.500' },
];

export function ProcessingBridge() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, index) => 
      setTimeout(() => setCurrentStep(index), (index + 1) * 2000)
    );
    
    const redirectTimer = setTimeout(() => navigate('/patient'), steps.length * 2000 + 500);
    
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <Layout title="Procesando" showBack>
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-12"
        >
          <div className="w-32 h-32 rounded-full border-4 border-mint/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full border-4 border-transparent border-t-mint"
            />
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-4xl">🥗</span>
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold text-navy mb-2">Generando tu Plan</h2>
        <p className="text-gray-500 text-center mb-10">Estamos preparando todo para ti</p>

        <div className="w-full max-w-sm space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-mint bg-mint/5 shadow-md'
                    : isComplete
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-mint text-white'
                      : isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isActive || isComplete ? 'text-gray-800' : 'text-gray-400'}`}>
                    {step.text}
                  </p>
                  <p className="text-sm text-gray-500">{step.subtext}</p>
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
