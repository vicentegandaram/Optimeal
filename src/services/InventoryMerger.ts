import type { WeeklyPlan, IngredientItem, Recipe } from './types';
import { ingredients } from '../data/mockData';

interface RawIngredient {
  name: string;
  grams: number;
}

const UNIT_CONVERSIONS: Record<string, { gramsPerUnit: number; commercialUnit: string }> = {
  'pollo': { gramsPerUnit: 500, commercialUnit: '500g' },
  'salmón': { gramsPerUnit: 400, commercialUnit: '400g' },
  'huev': { gramsPerUnit: 60, commercialUnit: 'docena (12)' },
  'quinoa': { gramsPerUnit: 500, commercialUnit: '500g' },
  'avena': { gramsPerUnit: 500, commercialUnit: '500g' },
  'aguacate': { gramsPerUnit: 200, commercialUnit: 'unidad' },
  'espinaca': { gramsPerUnit: 200, commercialUnit: '200g' },
  'brócoli': { gramsPerUnit: 300, commercialUnit: 'unidad' },
};

const STORE_PRICES: Record<string, { jumbo: number; lider: number }> = {
  'Pechuga de Pollo': { jumbo: 4590, lider: 4190 },
  'Salmón': { jumbo: 8990, lider: 9590 },
  'Quinoa': { jumbo: 3290, lider: 2990 },
  'Huevos': { jumbo: 2890, lider: 2590 },
  'Aguacate': { jumbo: 1990, lider: 1790 },
  'Espinacas': { jumbo: 1290, lider: 990 },
  'Brócoli': { jumbo: 1490, lider: 1190 },
  'Avena': { jumbo: 1890, lider: 1690 },
};

function findMatchingIngredient(name: string): typeof ingredients[0] | undefined {
  const lowerName = name.toLowerCase();
  return ingredients.find(i => 
    i.name.toLowerCase().includes(lowerName) ||
    lowerName.includes(i.name.toLowerCase())
  );
}

function getUnitInfo(ingredientName: string): { gramsPerUnit: number; commercialUnit: string } {
  const lowerName = ingredientName.toLowerCase();
  
  for (const [key, value] of Object.entries(UNIT_CONVERSIONS)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  
  return { gramsPerUnit: 100, commercialUnit: '100g' };
}

function calculateCommercialQuantity(totalGrams: number, gramsPerUnit: number): number {
  return Math.ceil(totalGrams / gramsPerUnit);
}

function formatCommercialQuantity(quantity: number, commercialUnit: string): string {
  if (commercialUnit.includes('docena')) {
    return quantity >= 12 ? `${Math.ceil(quantity / 12)} docena(s)` : `${quantity} unidades`;
  }
  if (commercialUnit === 'unidad') {
    return `${quantity} unidad(es)`;
  }
  return `${quantity} x ${commercialUnit}`;
}

function aggregateIngredients(weeklyPlan: WeeklyPlan): Map<string, RawIngredient> {
  const aggregated = new Map<string, RawIngredient>();

  const days = Object.values(weeklyPlan);
  
  days.forEach(day => {
    const meals: Recipe[] = [
      day.breakfast,
      day.lunch,
      day.snack,
      day.dinner,
    ].filter((m): m is Recipe => m !== null);

    meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        const existing = aggregated.get(ing.name);
        if (existing) {
          existing.grams += ing.grams;
        } else {
          aggregated.set(ing.name, { name: ing.name, grams: ing.grams });
        }
      });
    });
  });

  return aggregated;
}

function findBestPrice(name: string): { jumbo: number; lider: number } {
  const prices = STORE_PRICES[name];
  if (prices) {
    return prices;
  }

  const found = findMatchingIngredient(name);
  if (found) {
    const matchedPrices = STORE_PRICES[found.name];
    if (matchedPrices) {
      return matchedPrices;
    }
  }

  const lowerName = name.toLowerCase();
  if (lowerName.includes('pollo')) return STORE_PRICES['Pechuga de Pollo'];
  if (lowerName.includes('salmón')) return STORE_PRICES['Salmón'];
  if (lowerName.includes('huev')) return STORE_PRICES['Huevos'];
  if (lowerName.includes('quinoa')) return STORE_PRICES['Quinoa'];
  if (lowerName.includes('avena')) return STORE_PRICES['Avena'];
  if (lowerName.includes('aguacate')) return STORE_PRICES['Aguacate'];
  if (lowerName.includes('espinaca')) return STORE_PRICES['Espinacas'];
  if (lowerName.includes('brócoli')) return STORE_PRICES['Brócoli'];

  return { jumbo: 2990, lider: 2490 };
}

export function consolidateShoppingList(weeklyPlan: WeeklyPlan): IngredientItem[] {
  const aggregated = aggregateIngredients(weeklyPlan);
  const shoppingList: IngredientItem[] = [];

  aggregated.forEach((rawIng, _name) => {
    const unitInfo = getUnitInfo(rawIng.name);
    const commercialQty = calculateCommercialQuantity(rawIng.grams, unitInfo.gramsPerUnit);
    const prices = findBestPrice(rawIng.name);
    
    const bestStore = prices.jumbo <= prices.lider ? 'Jumbo' : 'Lider';
    const bestPrice = bestStore === 'Jumbo' ? prices.jumbo : prices.lider;

    const found = findMatchingIngredient(rawIng.name);
    const finalName = found?.name || rawIng.name;

    shoppingList.push({
      id: `ing_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: finalName,
      quantity: rawIng.grams,
      unit: 'g',
      commercialUnit: formatCommercialQuantity(commercialQty, unitInfo.commercialUnit),
      commercialQuantity: commercialQty,
      priceJumbo: prices.jumbo,
      priceLider: prices.lider,
      bestStore,
      bestPrice,
      totalGrams: rawIng.grams,
    });
  });

  return shoppingList.sort((a, b) => {
    if (a.bestStore !== b.bestStore) {
      return a.bestStore === 'Jumbo' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

export function calculateTotalCost(shoppingList: IngredientItem[]): { total: number; savings: number } {
  const total = shoppingList.reduce((acc, item) => acc + item.bestPrice, 0);
  const savings = shoppingList.reduce((acc, item) => acc + Math.abs(item.priceJumbo - item.priceLider), 0);
  return { total, savings };
}

export function groupByStore(shoppingList: IngredientItem[]): { jumbo: IngredientItem[]; lider: IngredientItem[] } {
  return {
    jumbo: shoppingList.filter(i => i.bestStore === 'Jumbo'),
    lider: shoppingList.filter(i => i.bestStore === 'Lider'),
  };
}
