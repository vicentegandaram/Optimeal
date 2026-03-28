import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ShoppingCart, Store, Check, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutritionPlan } from '../hooks/useNutritionPlan';
import { groupByStore } from '../services/InventoryMerger';

export function ExportView() {
  const navigate = useNavigate();
  const { plan, loadStoredPlan, exportPDF } = useNutritionPlan();

  useEffect(() => {
    if (!plan) {
      loadStoredPlan();
    }
  }, [plan, loadStoredPlan]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  const { jumbo, lider } = groupByStore(plan.shoppingList);
  const jumboTotal = jumbo.reduce((acc, item) => acc + item.bestPrice, 0);
  const liderTotal = lider.reduce((acc, item) => acc + item.bestPrice, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-navy text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-[450px] mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Exportar Plan</h1>
        </div>
      </header>

      <main className="max-w-[450px] mx-auto bg-white min-h-[calc(100vh-72px)] pb-24">
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-navy to-gray-800 rounded-2xl p-5 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-mint" size={24} />
              <div>
                <h2 className="text-white font-semibold">{plan.patientName}</h2>
                <p className="text-gray-300 text-sm">{plan.nutritionistName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-mint text-2xl font-bold">${plan.totalCost.toLocaleString('es-CL')}</p>
                <p className="text-gray-300 text-xs">Total estimado</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-green-400 text-2xl font-bold">${plan.totalSavings.toLocaleString('es-CL')}</p>
                <p className="text-gray-300 text-xs">Ahorro proyectado</p>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={exportPDF}
            className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition shadow-lg mb-6"
          >
            <Download size={20} />
            Descargar PDF Profesional
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-mint/10 to-transparent rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-mint" size={24} />
              <div>
                <p className="font-semibold text-navy">Push to Supermarket App</p>
                <p className="text-sm text-gray-500">Envía tu lista directamente a la app</p>
              </div>
            </div>
            <button className="w-full mt-4 py-3 bg-navy text-white rounded-xl font-medium flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              Enviar a la App
            </button>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-bold text-navy mb-4"
          >
            Lista de Compras
          </motion.h3>

          {jumbo.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="text-orange-500" size={20} />
                  <h4 className="font-semibold text-navy">Jumbo</h4>
                </div>
                <span className="text-orange-500 font-bold">${jumboTotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="space-y-2">
                {jumbo.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Check size={16} className="text-mint" />
                      <div>
                        <p className="font-medium text-navy text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.commercialUnit}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-navy">${item.bestPrice.toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {lider.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="text-blue-600" size={20} />
                  <h4 className="font-semibold text-navy">Líder</h4>
                </div>
                <span className="text-blue-600 font-bold">${liderTotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="space-y-2">
                {lider.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Check size={16} className="text-mint" />
                      <div>
                        <p className="font-medium text-navy text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.commercialUnit}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-navy">${item.bestPrice.toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
