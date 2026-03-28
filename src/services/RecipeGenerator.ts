import type { MacroTargets, Recipe, DayMeal, WeeklyPlan, MealIngredient } from './types';
import { ingredients } from '../data/mockData';

const MEAL_EMOJIS: Record<string, string> = {
  Desayuno: '🌅',
  Almuerzo: '☀️',
  Merienda: '🌤️',
  Cena: '🌙',
};

const RECIPE_TEMPLATES = [
  { name: 'Bowl de Quinoa con Pollo', emoji: '🥗', ingredients: ['Quinoa', 'Pechuga de Pollo', 'Espinacas'], prepTime: 25 },
  { name: 'Salmón al Horno con Vegetales', emoji: '🐟', ingredients: ['Salmón', 'Brócoli', 'Aguacate'], prepTime: 35 },
  { name: 'Ensalada Proteica con Huevos', emoji: '🥬', ingredients: ['Espinacas', 'Huevos', 'Aguacate'], prepTime: 15 },
  { name: 'Avena Proteica con Frutas', emoji: '🥣', ingredients: ['Avena', 'Huevos'], prepTime: 10 },
  { name: 'Huevos Revueltos con Palta', emoji: '🍳', ingredients: ['Huevos', 'Aguacate'], prepTime: 12 },
  { name: 'Pollo a la Plancha con Quinoa', emoji: '🍗', ingredients: ['Pechuga de Pollo', 'Quinoa', 'Espinacas'], prepTime: 20 },
  { name: 'Wrap de Pollo y Verduras', emoji: '🌯', ingredients: ['Pechuga de Pollo', 'Espinacas'], prepTime: 15 },
  { name: 'Bowl de Salmón y Arroz', emoji: '🍱', ingredients: ['Salmón', 'Avena'], prepTime: 30 },
  { name: 'Yogur con Granola y Frutas', emoji: '🥛', ingredients: ['Avena', 'Huevos'], prepTime: 5 },
  { name: 'Omelette con Verduras', emoji: '🍳', ingredients: ['Huevos', 'Espinacas', 'Brócoli'], prepTime: 15 },
  { name: 'Ensalada César con Pollo', emoji: '🥗', ingredients: ['Pechuga de Pollo', 'Espinacas'], prepTime: 20 },
  { name: 'Pechuga de Pollo con Brócoli', emoji: '🍽️', ingredients: ['Pechuga de Pollo', 'Brócoli'], prepTime: 25 },
];

function getIngredientGrams(ingredientName: string, mealType: string): number {
  const isProtein = ingredientName.toLowerCase().includes('pollo') || 
                    ingredientName.toLowerCase().includes('salmón') ||
                    ingredientName.toLowerCase().includes('huev');
  
  if (isProtein) {
    return mealType === 'Almuerzo' || mealType === 'Cena' ? 150 : 100;
  }
  
  if (ingredientName.toLowerCase().includes('aguacate')) {
    return 50;
  }
  
  if (ingredientName.toLowerCase().includes('quinoa') || ingredientName.toLowerCase().includes('avena')) {
    return 80;
  }
  
  return 100;
}

function findIngredientsByName(names: string[]): { name: string; grams: number }[] {
  return names.map(name => {
    const found = ingredients.find(i => 
      i.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(i.name.toLowerCase())
    );
    return {
      name: found?.name || name,
      grams: getIngredientGrams(name, 'Almuerzo'),
    };
  });
}

function calculateMealMacros(ingredients: MealIngredient[]): { calories: number; protein: number; carbs: number; fats: number } {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  ingredients.forEach(ing => {
    const grams = ing.grams;
    if (ing.name.toLowerCase().includes('pollo')) {
      calories += grams * 1.65;
      protein += grams * 0.31;
      fats += grams * 0.036;
      carbs += 0;
    } else if (ing.name.toLowerCase().includes('salmón')) {
      calories += grams * 2.08;
      protein += grams * 0.25;
      fats += grams * 0.13;
      carbs += 0;
    } else if (ing.name.toLowerCase().includes('huev')) {
      calories += grams * 1.55;
      protein += grams * 0.125;
      fats += grams * 0.107;
      carbs += grams * 0.011;
    } else if (ing.name.toLowerCase().includes('quinoa')) {
      calories += grams * 1.2;
      protein += grams * 0.044;
      carbs += grams * 0.21;
      fats += grams * 0.019;
    } else if (ing.name.toLowerCase().includes('avena')) {
      calories += grams * 1.3;
      protein += grams * 0.025;
      carbs += grams * 0.22;
      fats += grams * 0.02;
    } else if (ing.name.toLowerCase().includes('aguacate')) {
      calories += grams * 1.6;
      protein += grams * 0.02;
      carbs += grams * 0.085;
      fats += grams * 0.15;
    } else if (ing.name.toLowerCase().includes('espinaca')) {
      calories += grams * 0.23;
      protein += grams * 0.024;
      carbs += grams * 0.036;
      fats += grams * 0.004;
    } else if (ing.name.toLowerCase().includes('brócoli')) {
      calories += grams * 0.34;
      protein += grams * 0.028;
      carbs += grams * 0.066;
      fats += grams * 0.004;
    } else {
      calories += grams * 0.5;
      protein += grams * 0.02;
      carbs += grams * 0.1;
      fats += grams * 0.01;
    }
  });

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
  };
}

function generateRecipe(mealType: string, usedRecipes: Set<string>): Recipe {
  const availableTemplates = RECIPE_TEMPLATES.filter(t => !usedRecipes.has(t.name));
  const template = availableTemplates.length > 0 
    ? availableTemplates[Math.floor(Math.random() * availableTemplates.length)]
    : RECIPE_TEMPLATES[0];
  
  usedRecipes.add(template.name);

  const mealIngredients = findIngredientsByName(template.ingredients);
  const macros = calculateMealMacros(mealIngredients);

  return {
    id: `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: template.name,
    mealType: mealType as Recipe['mealType'],
    ...macros,
    ingredients: mealIngredients,
    emoji: template.emoji || MEAL_EMOJIS[mealType] || '🍽️',
    prepTime: template.prepTime,
  };
}

function generateDayMeal(_targets: MacroTargets, usedRecipes: Set<string>): DayMeal {
  const mealTypes: (keyof DayMeal)[] = ['breakfast', 'lunch', 'snack', 'dinner'];
  const mealTypeNames: Record<string, string> = {
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    snack: 'Merienda',
    dinner: 'Cena',
  };

  const day: DayMeal = {
    breakfast: null,
    lunch: null,
    snack: null,
    dinner: null,
  };

  mealTypes.forEach(mealKey => {
    const recipe = generateRecipe(mealTypeNames[mealKey], usedRecipes);
    switch (mealKey) {
      case 'breakfast':
        day.breakfast = recipe;
        break;
      case 'lunch':
        day.lunch = recipe;
        break;
      case 'snack':
        day.snack = recipe;
        break;
      case 'dinner':
        day.dinner = recipe;
        break;
    }
  });

  return day;
}

export function generateWeeklyPlan(_targets: MacroTargets): WeeklyPlan {
  const usedRecipes = new Set<string>();

  const days: (keyof WeeklyPlan)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const weeklyPlan: WeeklyPlan = {
    monday: { breakfast: null, lunch: null, snack: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, snack: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, snack: null, dinner: null },
    thursday: { breakfast: null, lunch: null, snack: null, dinner: null },
    friday: { breakfast: null, lunch: null, snack: null, dinner: null },
    saturday: { breakfast: null, lunch: null, snack: null, dinner: null },
    sunday: { breakfast: null, lunch: null, snack: null, dinner: null },
  };

  days.forEach(day => {
    weeklyPlan[day] = generateDayMeal(_targets, usedRecipes);
  });

  return weeklyPlan;
}

export function getMealEmoji(mealType: string): string {
  return MEAL_EMOJIS[mealType] || '🍽️';
}

export function getMealDisplayName(mealKey: string): string {
  const names: Record<string, string> = {
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    snack: 'Merienda',
    dinner: 'Cena',
  };
  return names[mealKey] || mealKey;
}
