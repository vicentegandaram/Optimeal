import { motion } from 'framer-motion';
import { Stethoscope, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleNutriLogin = () => {
    login('nutritionist');
    navigate('/dashboard-nutri');
  };

  const handlePatientLogin = () => {
    login('patient');
    navigate('/patient');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold text-navy mb-2">OptiMeal</h1>
        <p className="text-gray-500">Nutrición inteligente para tu vida</p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <motion.button
          onClick={handleNutriLogin}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-navy text-white p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <Stethoscope size={32} className="text-mint" />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-semibold">Acceso Nutricionista</h2>
            <p className="text-gray-300 text-sm">Panel B2B profesional</p>
          </div>
          <div className="text-mint">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>

        <motion.button
          onClick={handlePatientLogin}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-navy p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-mint"
        >
          <div className="w-16 h-16 bg-mint/10 rounded-xl flex items-center justify-center">
            <User size={32} className="text-mint" />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-semibold">Acceso Paciente</h2>
            <p className="text-gray-500 text-sm">Portal B2C personalizado</p>
          </div>
          <div className="text-mint">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-gray-400"
      >
        ¿No tienes cuenta? Contacta a tu nutricionista
      </motion.p>
    </div>
  );
}
