import type { ParseResult, MacroTargets } from './types';

const MACRO_PATTERNS = {
  protein: /(?:prote[ií]na|protein)[^\d]*(\d+(?:[.,]\d+)?)\s*(?:g|gramos|gr)?/gi,
  carbs: /(?:carbohidratos?|carb|carbo)[^\d]*(\d+(?:[.,]\d+)?)\s*(?:g|gramos|gr)?/gi,
  fats: /(?:grasas?|grasa|fat)[^\d]*(\d+(?:[.,]\d+)?)\s*(?:g|gramos|gr)?/gi,
  calories: /(?:calor[ií]as?|kcal|cal)[^\d]*(\d+(?:[.,]\d+)?)/gi,
};

function parseNumber(value: string): number {
  return parseFloat(value.replace(',', '.'));
}

function extractMacro(text: string, pattern: RegExp): number {
  const matches = [...text.matchAll(pattern)];
  if (matches.length > 0) {
    return parseNumber(matches[0][1]);
  }
  return 0;
}

export function parseNutritionPlanText(text: string): ParseResult {
  const cleanText = text.trim();

  const protein = extractMacro(cleanText, MACRO_PATTERNS.protein);
  const carbs = extractMacro(cleanText, MACRO_PATTERNS.carbs);
  const fats = extractMacro(cleanText, MACRO_PATTERNS.fats);
  const calories = extractMacro(cleanText, MACRO_PATTERNS.calories);

  const targets: MacroTargets = {
    protein: protein || 150,
    carbs: carbs || 250,
    fats: fats || 60,
    calories: calories || 1800,
  };

  return {
    targets,
    rawText: cleanText,
  };
}

export function parseDayFromText(text: string, dayName: string): string | null {
  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  const normalizedDay = dayName.toLowerCase();
  
  if (!days.includes(normalizedDay)) {
    return null;
  }

  const dayPattern = new RegExp(`${dayName}[^]*?(?=${days.join('|')}|$)`, 'i');
  const match = text.match(dayPattern);
  
  return match ? match[0] : null;
}

export function extractMealsFromDay(dayText: string): { type: string; content: string }[] {
  const mealTypes = ['desayuno', 'almuerzo', 'merienda', 'cena', 'comida', 'once'];
  const meals: { type: string; content: string }[] = [];

  mealTypes.forEach((mealType) => {
    const pattern = new RegExp(`${mealType}[^]*?(?=${mealTypes.join('|')}|$)`, 'gi');
    const match = dayText.match(pattern);
    
    if (match) {
      meals.push({
        type: normalizeMealType(mealType),
        content: match[0],
      });
    }
  });

  return meals;
}

function normalizeMealType(type: string): string {
  const map: Record<string, string> = {
    desayuno: 'Desayuno',
    almuerzo: 'Almuerzo',
    merienda: 'Merienda',
    cena: 'Cena',
    comida: 'Almuerzo',
    once: 'Merienda',
  };
  return map[type.toLowerCase()] || type;
}

export function generatePlanId(): string {
  return `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
