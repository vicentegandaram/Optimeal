export interface MacroTargets {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface IngredientItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  commercialUnit: string;
  commercialQuantity: number;
  priceJumbo: number;
  priceLider: number;
  bestStore: 'Jumbo' | 'Lider';
  bestPrice: number;
  totalGrams: number;
}

export interface MealIngredient {
  name: string;
  grams: number;
}

export interface Recipe {
  id: string;
  name: string;
  mealType: 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: MealIngredient[];
  emoji: string;
  prepTime: number;
}

export interface DayMeal {
  breakfast: Recipe | null;
  lunch: Recipe | null;
  snack: Recipe | null;
  dinner: Recipe | null;
}

export interface WeeklyPlan {
  monday: DayMeal;
  tuesday: DayMeal;
  wednesday: DayMeal;
  thursday: DayMeal;
  friday: DayMeal;
  saturday: DayMeal;
  sunday: DayMeal;
}

export interface NutritionPlan {
  id: string;
  patientName: string;
  nutritionistName: string;
  createdAt: Date;
  targets: MacroTargets;
  weeklyPlan: WeeklyPlan;
  shoppingList: IngredientItem[];
  totalCost: number;
  totalSavings: number;
}

export interface ParseResult {
  targets: MacroTargets;
  rawText: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  currentStep: number;
  stepMessage: string;
  progress: number;
}
