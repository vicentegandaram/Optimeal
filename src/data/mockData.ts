export interface Patient {
  id: string;
  name: string;
  adherence: number;
  lastVisit: string;
  avatar: string;
  email: string;
}

export interface Nutritionist {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export interface MacroProgress {
  name: string;
  current: number;
  target: number;
  color: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  store: 'Jumbo' | 'Lider';
  price: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  image: string;
  time: string;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: RecipeIngredient[];
}

export interface Meal {
  name: string;
  recipe: Recipe;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export const nutritionist: Nutritionist = {
  id: 'nut-001',
  name: 'Pamela Angelus',
  specialty: 'Nutricionista Deportiva',
  avatar: 'PA',
};

export const patients: Patient[] = [
  {
    id: 'pat-001',
    name: 'Andrés Morales',
    adherence: 78,
    lastVisit: 'Hace 2 días',
    avatar: 'AM',
    email: 'andres.morales@email.cl',
  },
  {
    id: 'pat-002',
    name: 'Valentina Silva',
    adherence: 92,
    lastVisit: 'Hoy',
    avatar: 'VS',
    email: 'valentina.silva@email.cl',
  },
];

export const macros: MacroProgress[] = [
  { name: 'Proteína', current: 120, target: 150, color: '#2ECC71' },
  { name: 'Carbohidratos', current: 200, target: 280, color: '#3498DB' },
  { name: 'Grasas', current: 45, target: 60, color: '#E74C3C' },
];

export const ingredients: Ingredient[] = [
  { id: 'ing-001', name: 'Pechuga de Pollo', quantity: '500g', store: 'Jumbo', price: 4590 },
  { id: 'ing-002', name: 'Quinoa', quantity: '1kg', store: 'Jumbo', price: 3290 },
  { id: 'ing-003', name: 'Brócoli', quantity: '2 unidades', store: 'Lider', price: 1490 },
  { id: 'ing-004', name: 'Aguacate', quantity: '3 unidades', store: 'Lider', price: 1990 },
  { id: 'ing-005', name: 'Salmón', quantity: '400g', store: 'Jumbo', price: 8990 },
  { id: 'ing-006', name: 'Espinacas', quantity: '200g', store: 'Lider', price: 990 },
  { id: 'ing-007', name: 'Huevos', quantity: '12 unidades', store: 'Jumbo', price: 2890 },
  { id: 'ing-008', name: 'Avena', quantity: '500g', store: 'Lider', price: 1890 },
];

export const recipes: Recipe[] = [
  {
    id: 'rec-001',
    name: 'Bowl de Quinoa con Pollo',
    calories: 485,
    image: '🥗',
    time: '25 min',
    protein: 35,
    carbs: 45,
    fats: 12,
    ingredients: [
      { name: 'Quinoa', quantity: '100g' },
      { name: 'Pechuga de Pollo', quantity: '150g' },
      { name: 'Espinacas', quantity: '50g' },
      { name: 'Aguacate', quantity: '0.5 unidad' },
    ],
  },
  {
    id: 'rec-002',
    name: 'Salmón al Horno con Brócoli',
    calories: 520,
    image: '🐟',
    time: '35 min',
    protein: 40,
    carbs: 20,
    fats: 28,
    ingredients: [
      { name: 'Salmón', quantity: '200g' },
      { name: 'Brócoli', quantity: '1 unidad' },
      { name: 'Aguacate', quantity: '0.5 unidad' },
    ],
  },
  {
    id: 'rec-003',
    name: 'Ensalada Proteica',
    calories: 340,
    image: '🥬',
    time: '15 min',
    protein: 25,
    carbs: 30,
    fats: 15,
    ingredients: [
      { name: 'Espinacas', quantity: '100g' },
      { name: 'Huevos', quantity: '2 unidades' },
      { name: 'Aguacate', quantity: '0.5 unidad' },
    ],
  },
  {
    id: 'rec-004',
    name: 'Avena con Huevos',
    calories: 420,
    image: '🥣',
    time: '10 min',
    protein: 22,
    carbs: 50,
    fats: 14,
    ingredients: [
      { name: 'Avena', quantity: '80g' },
      { name: 'Huevos', quantity: '2 unidades' },
    ],
  },
  {
    id: 'rec-005',
    name: 'Huevos Revueltos con Palta',
    calories: 450,
    image: '🍳',
    time: '12 min',
    protein: 24,
    carbs: 15,
    fats: 35,
    ingredients: [
      { name: 'Huevos', quantity: '3 unidades' },
      { name: 'Aguacate', quantity: '1 unidad' },
    ],
  },
  {
    id: 'rec-006',
    name: 'Pollo a la Plancha con Quinoa',
    calories: 480,
    image: '🍗',
    time: '20 min',
    protein: 42,
    carbs: 35,
    fats: 15,
    ingredients: [
      { name: 'Pechuga de Pollo', quantity: '200g' },
      { name: 'Quinoa', quantity: '80g' },
      { name: 'Espinacas', quantity: '50g' },
    ],
  },
];

export const weeklyPlanTemplate: DayPlan[] = [
  {
    day: 'Lunes',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[0] },
      { name: 'Merienda', recipe: recipes[4] },
      { name: 'Cena', recipe: recipes[1] },
    ],
  },
  {
    day: 'Martes',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[5] },
      { name: 'Merienda', recipe: recipes[3] },
      { name: 'Cena', recipe: recipes[2] },
    ],
  },
  {
    day: 'Miércoles',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[1] },
      { name: 'Merienda', recipe: recipes[4] },
      { name: 'Cena', recipe: recipes[0] },
    ],
  },
  {
    day: 'Jueves',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[2] },
      { name: 'Merienda', recipe: recipes[3] },
      { name: 'Cena', recipe: recipes[5] },
    ],
  },
  {
    day: 'Viernes',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[0] },
      { name: 'Merienda', recipe: recipes[4] },
      { name: 'Cena', recipe: recipes[1] },
    ],
  },
  {
    day: 'Sábado',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[5] },
      { name: 'Merienda', recipe: recipes[2] },
      { name: 'Cena', recipe: recipes[1] },
    ],
  },
  {
    day: 'Domingo',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[1] },
      { name: 'Merienda', recipe: recipes[4] },
      { name: 'Cena', recipe: recipes[5] },
    ],
  },
];

export function getShoppingListFromPlan(plan: DayPlan[]): Ingredient[] {
  const ingredientCounts: Record<string, { ingredient: Ingredient; totalQty: string }> = {};

  plan.forEach(day => {
    day.meals.forEach(meal => {
      meal.recipe.ingredients.forEach(ing => {
        if (!ingredientCounts[ing.name]) {
          const found = ingredients.find(i => i.name.toLowerCase().includes(ing.name.toLowerCase()));
          if (found) {
            ingredientCounts[ing.name] = { ingredient: found, totalQty: ing.quantity };
          }
        }
      });
    });
  });

  return Object.values(ingredientCounts).map(v => ({
    ...v.ingredient,
    quantity: v.totalQty,
  }));
}
