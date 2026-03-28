import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Clock, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutritionPlan } from '../hooks/useNutritionPlan';
import type { WeeklyPlan, Recipe } from '../services/types';

const DAY_KEYS: (keyof WeeklyPlan)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const DAY_NAMES: Record<keyof WeeklyPlan, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

const MEAL_KEYS = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

const MEAL_NAMES = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  snack: 'Merienda',
  dinner: 'Cena',
};

export function Planner() {
  const navigate = useNavigate();
  const { plan, loadStoredPlan } = useNutritionPlan();
  const [selectedDay, setSelectedDay] = useState<keyof WeeklyPlan | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!plan) {
      loadStoredPlan();
    }
  }, [plan, loadStoredPlan]);

  const day = selectedDay && plan ? plan.weeklyPlan[selectedDay] : null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-navy text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-[450px] mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Plan Semanal</h1>
        </div>
      </header>

      <main className="max-w-[450px] mx-auto bg-white min-h-[calc(100vh-72px)]">
        {!plan ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Cargando plan...</p>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {DAY_KEYS.map((dayKey, index) => (
                  <motion.button
                    key={dayKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedDay(dayKey)}
                    className={`p-2 rounded-xl text-center transition-all ${
                      selectedDay === dayKey
                        ? 'bg-mint text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <p className={`text-xs font-medium ${
                      selectedDay === dayKey ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {DAY_NAMES[dayKey].slice(0, 2)}
                    </p>
                    <p className={`font-bold text-sm ${
                      selectedDay === dayKey ? 'text-white' : 'text-navy'
                    }`}>
                      {MEAL_KEYS.filter(key => day && day[key]).length}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedDay && day ? (
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="px-4 pb-24"
                >
                  <h2 className="text-xl font-bold text-navy mb-4">
                    {DAY_NAMES[selectedDay]}
                  </h2>

                  <div className="space-y-4">
                    {MEAL_KEYS.map((mealKey, index) => {
                      const meal = day[mealKey];
                      if (!meal) return null;

                      return (
                        <motion.div
                          key={mealKey}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedMeal(meal)}
                          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-mint/10 rounded-xl flex items-center justify-center text-2xl">
                              {meal.emoji}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-mint font-medium">
                                  {MEAL_NAMES[mealKey]}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock size={12} />
                                  {meal.prepTime} min
                                </span>
                              </div>
                              <h3 className="font-semibold text-navy">{meal.name}</h3>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Flame size={12} />
                                  {meal.calories} kcal
                                </span>
                                <span className="text-mint">P: {meal.protein}g</span>
                                <span className="text-blue-500">C: {meal.carbs}g</span>
                                <span className="text-red-500">G: {meal.fats}g</span>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                          </div>

                          <AnimatePresence>
                            {selectedMeal?.id === meal.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-gray-100"
                              >
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredientes:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {meal.ingredients.map((ing, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                                    >
                                      {ing.name} ({ing.grams}g)
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 text-center py-12"
                >
                  <p className="text-gray-500">Selecciona un día para ver las comidas</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  );
}
