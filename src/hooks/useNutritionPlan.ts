import { useState, useCallback } from 'react';
import type { NutritionPlan, ProcessingState } from '../services/types';
import { parseNutritionPlanText, generatePlanId } from '../services/PlanParser';
import { generateWeeklyPlan } from '../services/RecipeGenerator';
import { consolidateShoppingList, calculateTotalCost } from '../services/InventoryMerger';
import { downloadPDF } from '../services/PDFExporter';
import { patients, nutritionist } from '../data/mockData';

const PROCESSING_STEPS = [
  { message: 'Analizando texto de pauta...', duration: 800 },
  { message: 'Extrayendo macros objetivo...', duration: 600 },
  { message: 'Generando recetas personalizadas...', duration: 1000 },
  { message: 'Calculando lista de compras...', duration: 700 },
  { message: 'Optimizando por supermercado...', duration: 500 },
  { message: '¡Listo! Tu plan está preparado', duration: 400 },
];

export function useNutritionPlan() {
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    currentStep: 0,
    stepMessage: '',
    progress: 0,
  });

  const processPlan = useCallback(async (text: string) => {
    setProcessing({
      isProcessing: true,
      currentStep: 0,
      stepMessage: PROCESSING_STEPS[0].message,
      progress: 0,
    });

    let totalDuration = PROCESSING_STEPS.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      const step = PROCESSING_STEPS[i];
      elapsed += step.duration;
      
      setProcessing(prev => ({
        ...prev,
        currentStep: i,
        stepMessage: step.message,
        progress: Math.round((elapsed / totalDuration) * 100),
      }));

      await new Promise(resolve => setTimeout(resolve, step.duration));
    }

    const parseResult = parseNutritionPlanText(text);
    const weeklyPlan = generateWeeklyPlan(parseResult.targets);
    const shoppingList = consolidateShoppingList(weeklyPlan);
    const { total, savings } = calculateTotalCost(shoppingList);

    const newPlan: NutritionPlan = {
      id: generatePlanId(),
      patientName: patients[0].name,
      nutritionistName: nutritionist.name,
      createdAt: new Date(),
      targets: parseResult.targets,
      weeklyPlan,
      shoppingList,
      totalCost: total,
      totalSavings: savings,
    };

    localStorage.setItem('optimeal_nutrition_plan', JSON.stringify(newPlan));
    
    setProcessing({
      isProcessing: false,
      currentStep: PROCESSING_STEPS.length,
      stepMessage: '¡Completado!',
      progress: 100,
    });

    setPlan(newPlan);
    return newPlan;
  }, []);

  const loadStoredPlan = useCallback(() => {
    const stored = localStorage.getItem('optimeal_nutrition_plan');
    if (stored) {
      try {
        const parsedPlan = JSON.parse(stored);
        parsedPlan.createdAt = new Date(parsedPlan.createdAt);
        setPlan(parsedPlan);
        return parsedPlan;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(null);
    localStorage.removeItem('optimeal_nutrition_plan');
  }, []);

  const exportPDF = useCallback(() => {
    if (plan) {
      downloadPDF(plan);
    }
  }, [plan]);

  const getProgress = useCallback(() => {
    if (!plan) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    const days = Object.values(plan.weeklyPlan);
    days.forEach(day => {
      [day.breakfast, day.lunch, day.snack, day.dinner].forEach(meal => {
        if (meal) {
          totalProtein += meal.protein;
          totalCarbs += meal.carbs;
          totalFats += meal.fats;
          totalCalories += meal.calories;
        }
      });
    });

    const daysInWeek = 7;
    return {
      protein: Math.round(totalProtein / daysInWeek),
      carbs: Math.round(totalCarbs / daysInWeek),
      fats: Math.round(totalFats / daysInWeek),
      calories: Math.round(totalCalories / daysInWeek),
    };
  }, [plan]);

  return {
    plan,
    processing,
    processPlan,
    loadStoredPlan,
    clearPlan,
    exportPDF,
    getProgress,
  };
}
