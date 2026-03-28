export interface NutritionGuidelines {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface MealMacro {
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  name: string;
  recipes: string[];
  macros: MealMacro;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface NutritionPlan {
  weeklyPlan: DayPlan[];
}

export interface IngredientList {
  jumbo: string[];
  lider: string[];
}

export interface ExtractedData {
  guidelines: NutritionGuidelines;
  ingredients: IngredientList;
  weeklyPlan: NutritionPlan['weeklyPlan'];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  price: number;
  store: 'Jumbo' | 'Lider';
  image?: string;
}

export type ShoppingItem = Ingredient;
