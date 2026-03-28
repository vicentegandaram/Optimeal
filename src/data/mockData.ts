export interface Patient {
  id: string;
  name: string;
  adherence: number;
  lastVisit: string;
  avatar: string;
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
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  store: 'Jumbo' | 'Lider';
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
  },
  {
    id: 'pat-002',
    name: 'María Fernández',
    adherence: 92,
    lastVisit: 'Hoy',
    avatar: 'MF',
  },
  {
    id: 'pat-003',
    name: 'Carlos Vega',
    adherence: 65,
    lastVisit: 'Hace 1 semana',
    avatar: 'CV',
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
  },
  {
    id: 'rec-002',
    name: 'Salmón al Horno',
    calories: 520,
    image: '🐟',
    time: '35 min',
  },
  {
    id: 'rec-003',
    name: 'Ensalada Proteica',
    calories: 340,
    image: '🥬',
    time: '15 min',
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
