import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Check, LogOut, ShoppingBag, Download } from 'lucide-react';
import { MacroRing } from '../components/MacroRing';
import { EmptyState } from '../components/EmptyState';
import { Dropzone } from '../components/Dropzone';
import { useNutritionPlan } from '../hooks/useNutritionPlan';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { MacroTargets } from '../services/types';

const SAMPLE_PLAN_TEXT = `
PLAN NUTRICIONAL SEMANAL

OBJETIVOS:
- Proteína: 150g diarios
- Carbohidratos: 250g diarios
- Grasas: 60g diarios
- Calorías: 1800 kcal

LUNES:
Desayuno: Avena con huevos
Almuerzo: Bowl de quinoa con pollo
Merienda: Yogur con avena
Cena: Ensalada proteica

MARTES:
Desayuno: Huevos con palta
Almuerzo: Salmón al horno
Merienda: Avena
Cena: Pollo a la plancha con quinoa
`;

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { plan, processing, processPlan, loadStoredPlan, getProgress } = useNutritionPlan();
  const [hasPlan, setHasPlan] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [planText, setPlanText] = useState('');

  useEffect(() => {
    const stored = loadStoredPlan();
    if (stored) {
      setHasPlan(true);
    }
  }, [loadStoredPlan]);

  const handleGeneratePlan = async () => {
    await processPlan(SAMPLE_PLAN_TEXT);
    setHasPlan(true);
    setShowUploadModal(false);
  };

  const handleCustomPlan = async () => {
    if (planText.trim()) {
      await processPlan(planText);
      setHasPlan(true);
      setShowUploadModal(false);
      setPlanText('');
    }
  };

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    if (text.trim()) {
      await processPlan(text);
      setHasPlan(true);
      setShowUploadModal(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const progress = getProgress();

  const macroTargets: MacroTargets = plan?.targets || {
    protein: 150,
    carbs: 250,
    fats: 60,
    calories: 1800,
  };

  const macros = [
    { name: 'Proteína', current: progress.protein, target: macroTargets.protein, color: '#2ECC71' },
    { name: 'Carbohidratos', current: progress.carbs, target: macroTargets.carbs, color: '#3498DB' },
    { name: 'Grasas', current: progress.fats, target: macroTargets.fats, color: '#E74C3C' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-navy text-white px-4 py-4">
        <div className="max-w-[450px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center font-bold">
              {user?.avatar || 'PA'}
            </div>
            <div>
              <h1 className="font-semibold">{user?.name || 'OptiMeal'}</h1>
              <p className="text-xs text-gray-300">Plan nutricional activo</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-[450px] mx-auto bg-white min-h-[calc(100vh-72px)] pb-24">
        <div className="p-4">
          <AnimatePresence mode="wait">
            {!hasPlan && !processing.isProcessing ? (
              <EmptyState key="empty" />
            ) : processing.isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 border-4 border-mint border-t-transparent rounded-full mb-6"
                />
                <h3 className="text-xl font-bold text-navy mb-2">{processing.stepMessage}</h3>
                <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-mint"
                    initial={{ width: 0 }}
                    animate={{ width: `${processing.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">{processing.progress}% completado</p>
              </motion.div>
            ) : plan ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gradient-to-br from-navy to-gray-800 rounded-2xl p-6 mb-6">
                  <h2 className="text-white font-semibold mb-4">Resumen de Macros Diarios</h2>
                  <div className="flex justify-around">
                    {macros.map((macro) => (
                      <MacroRing
                        key={macro.name}
                        name={macro.name}
                        current={macro.current}
                        target={macro.target}
                        color={macro.color}
                        size={90}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-mint/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="text-mint" size={24} />
                      <div>
                        <p className="font-semibold text-navy">{plan.shoppingList.length} ingredientes</p>
                        <p className="text-sm text-gray-500">
                          Ahorro: ${plan.totalSavings.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-mint">
                      ${plan.totalCost.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => navigate('/planner')}
                    className="flex flex-col items-center gap-2 p-4 bg-navy text-white rounded-xl hover:bg-navy/90 transition"
                  >
                    <FileText size={28} />
                    <span className="font-medium">Ver Plan</span>
                  </button>
                  <button
                    onClick={() => navigate('/export')}
                    className="flex flex-col items-center gap-2 p-4 bg-mint text-white rounded-xl hover:bg-mint/90 transition"
                  >
                    <Download size={28} />
                    <span className="font-medium">Exportar</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 flex items-center justify-center gap-2 hover:border-mint hover:text-mint transition"
                >
                  Actualizar pauta
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {!hasPlan && !processing.isProcessing && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-[450px] mx-auto">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition shadow-lg"
            >
              <Sparkles size={20} />
              Generar Mi Plan
            </button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <Sparkles className="text-mint" />
                Magic Sync
              </h3>

              <p className="text-gray-500 mb-4 text-sm">
                Sube tu pauta en archivo o genera un plan sugerido automáticamente.
              </p>

              <div className="mb-4">
                <Dropzone onFileUpload={handleFileUpload} />
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              <textarea
                value={planText}
                onChange={(e) => setPlanText(e.target.value)}
                placeholder="Pega aquí las pautas de tu nutricionista..."
                className="w-full h-32 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-mint text-sm mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCustomPlan}
                  disabled={!planText.trim()}
                  className="flex-1 py-3 bg-navy text-white rounded-xl font-medium disabled:opacity-50"
                >
                  Procesar
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">¿Sin pauta? Genera una sugerida:</p>
                <button
                  onClick={handleGeneratePlan}
                  className="w-full py-3 bg-mint text-white rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  Generar Plan Sugerido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
