import type { NutritionPlan, NutritionGuidelines, ExtractedData } from '../types';

export async function parseNutritionPlan(_file: File): Promise<ExtractedData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = `PLAN NUTRICIONAL SEMANAL

PROTEÍNAS: 150g diarios
- Pollo: 500g
- Salmón: 400g
- Huevos: 12 unidades
- Quinoa: 1kg

CARBOHIDRATOS: 280g diarios
- Arroz integral: 2kg
- Avena: 1kg
- Pan integral: 500g
- Papas: 1.5kg

GRASAS: 60g diarios
- Aceite de oliva: 500ml
- Palta: 6 unidades
- Almendras: 300g
- Aceite de coco: 250ml

INGREDIENTES POR SEMANA:
JUMBO: Pollo, Salmón, Arroz integral, Quinoa, Aceite de oliva
LIDER: Palta, Almendras, Vegetales frescos, Huevos`;

      const extracted: ExtractedData = {
        guidelines: extractGuidelines(text),
        ingredients: extractIngredients(text),
        weeklyPlan: generateWeeklyPlan(),
        calories: 1850,
        protein: 150,
        carbs: 280,
        fats: 60,
      };

      resolve(extracted);
    }, 2000);
  });
}

function extractGuidelines(text: string): NutritionGuidelines {
  const proteinMatch = text.match(/PROTEÍNAS.*?(\d+)g/i);
  const carbsMatch = text.match(/CARBOHIDRATOS.*?(\d+)g/i);
  const fatsMatch = text.match(/GRASAS.*?(\d+)g/i);
  const caloriesMatch = text.match(/CALORÍAS.*?(\d+)/i);

  return {
    protein: proteinMatch ? parseInt(proteinMatch[1]) : 120,
    carbs: carbsMatch ? parseInt(carbsMatch[1]) : 200,
    fats: fatsMatch ? parseInt(fatsMatch[1]) : 50,
    calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 1800,
  };
}

function extractIngredients(text: string): ExtractedData['ingredients'] {
  const jumboMatch = text.match(/JUMBO:\s*([\s\S]*?)(?=LIDER:|$)/i);
  const liderMatch = text.match(/LIDER:\s*([\s\S]*?)$/i);

  const parseItems = (section: string | undefined): string[] => {
    if (!section) return [];
    return section
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 2);
  };

  return {
    jumbo: parseItems(jumboMatch?.[1]),
    lider: parseItems(liderMatch?.[1]),
  };
}

function generateWeeklyPlan(): NutritionPlan['weeklyPlan'] {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const meals = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];

  return days.map(day => ({
    day,
    meals: meals.map(meal => ({
      name: meal,
      recipes: [generateRecipe(meal)],
      macros: {
        protein: Math.floor(Math.random() * 40 + 20),
        carbs: Math.floor(Math.random() * 60 + 30),
        fats: Math.floor(Math.random() * 20 + 10),
      },
    })),
  }));
}

function generateRecipe(mealType: string): string {
  const recipes: Record<string, string[]> = {
    Desayuno: ['Avena con frutas', 'Huevos revueltos', 'Yogur con granola', 'Smoothie proteico'],
    Almuerzo: ['Bowl de quinoa', 'Ensalada proteica', 'Pollo a la plancha', 'Salmón con verduras'],
    Merienda: ['Frutos secos', 'Fruta fresca', 'Proteína en polvo', 'Queso cottage'],
    Cena: ['Pechuga de pollo', 'Pescado al horno', 'Ensalada verde', 'Crema de verduras'],
  };

  const options = recipes[mealType] || ['Comida balanceada'];
  return options[Math.floor(Math.random() * options.length)];
}
