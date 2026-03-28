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

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  image: string;
  time: string;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  store: 'Jumbo' | 'Lider';
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
  },
  {
    id: 'rec-002',
    name: 'Salmón al Horno',
    calories: 520,
    image: '🐟',
    time: '35 min',
    protein: 40,
    carbs: 20,
    fats: 28,
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
  },
  {
    id: 'rec-004',
    name: 'Avena con Frutas',
    calories: 380,
    image: '🥣',
    time: '10 min',
    protein: 15,
    carbs: 60,
    fats: 8,
  },
  {
    id: 'rec-005',
    name: 'Huevos Revueltos con Palta',
    calories: 420,
    image: '🍳',
    time: '12 min',
    protein: 22,
    carbs: 15,
    fats: 32,
  },
  {
    id: 'rec-006',
    name: 'Yogur con Granola',
    calories: 290,
    image: '🥛',
    time: '5 min',
    protein: 12,
    carbs: 40,
    fats: 10,
  },
];

export const ingredients: Ingredient[] = [
  { id: 'ing-001', name: 'Pechuga de Pollo', quantity: '500g', store: 'Jumbo' },
  { id: 'ing-002', name: 'Quinoa', quantity: '1kg', store: 'Jumbo' },
  { id: 'ing-003', name: 'Brócoli', quantity: '2 unidades', store: 'Lider' },
  { id: 'ing-004', name: 'Aguacate', quantity: '3 unidades', store: 'Lider' },
  { id: 'ing-005', name: 'Salmón', quantity: '400g', store: 'Jumbo' },
  { id: 'ing-006', name: 'Espinacas', quantity: '200g', store: 'Lider' },
];

export const weeklyPlanTemplate: DayPlan[] = [
  {
    day: 'Lunes',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[0] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[2] },
    ],
  },
  {
    day: 'Martes',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[1] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[2] },
    ],
  },
  {
    day: 'Miércoles',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[0] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[1] },
    ],
  },
  {
    day: 'Jueves',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[2] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[0] },
    ],
  },
  {
    day: 'Viernes',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[1] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[2] },
    ],
  },
  {
    day: 'Sábado',
    meals: [
      { name: 'Desayuno', recipe: recipes[4] },
      { name: 'Almuerzo', recipe: recipes[0] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[1] },
    ],
  },
  {
    day: 'Domingo',
    meals: [
      { name: 'Desayuno', recipe: recipes[3] },
      { name: 'Almuerzo', recipe: recipes[2] },
      { name: 'Merienda', recipe: recipes[5] },
      { name: 'Cena', recipe: recipes[0] },
    ],
  },
];
