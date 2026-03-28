import jsPDF from 'jspdf';
import type { NutritionPlan, WeeklyPlan, IngredientItem } from './types';

const COLORS = {
  mint: [46, 204, 113],
  navy: [27, 38, 59],
  gray: [100, 100, 100],
  lightGray: [240, 240, 240],
};

const DAY_NAMES: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

const MEAL_NAMES: Record<string, string> = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  snack: 'Merienda',
  dinner: 'Cena',
};

function setTextColor(pdf: jsPDF, color: number[]) {
  pdf.setTextColor(color[0], color[1], color[2]);
}

function addHeader(pdf: jsPDF, plan: NutritionPlan) {
  pdf.setFillColor(...COLORS.navy as [number, number, number]);
  pdf.rect(0, 0, 210, 40, 'F');
  
  setTextColor(pdf, [255, 255, 255]);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('OptiMeal', 105, 18, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Plan Nutricional - ${plan.patientName}`, 105, 28, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.text(`Nutricionista: ${plan.nutritionistName}`, 105, 35, { align: 'center' });
  pdf.text(`Fecha: ${new Date(plan.createdAt).toLocaleDateString('es-CL')}`, 105, 41, { align: 'center' });
}

function addMacroTargets(pdf: jsPDF, plan: NutritionPlan, startY: number) {
  let y = startY;
  
  pdf.setFillColor(...COLORS.lightGray as [number, number, number]);
  pdf.rect(10, y, 190, 25, 'F');
  
  setTextColor(pdf, COLORS.navy);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Macros Objetivos Diarios', 15, y + 8);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Proteína: ${plan.targets.protein}g`, 20, y + 18);
  pdf.text(`Carbohidratos: ${plan.targets.carbs}g`, 70, y + 18);
  pdf.text(`Grasas: ${plan.targets.fats}g`, 120, y + 18);
  pdf.text(`Calorías: ${plan.targets.calories} kcal`, 160, y + 18);
  
  return y + 30;
}

function addWeeklyPlan(pdf: jsPDF, weeklyPlan: WeeklyPlan, startY: number) {
  let y = startY;
  
  setTextColor(pdf, COLORS.navy);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Plan Semanal', 15, y);
  y += 10;
  
  const days = Object.entries(weeklyPlan) as [keyof WeeklyPlan, typeof weeklyPlan[keyof WeeklyPlan]][];
  
  days.forEach(([dayKey, day]) => {
    if (y > 250) {
      pdf.addPage();
      y = 20;
    }
    
    pdf.setFillColor(...COLORS.mint as [number, number, number]);
    pdf.rect(10, y, 190, 8, 'F');
    setTextColor(pdf, [255, 255, 255]);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(DAY_NAMES[dayKey], 15, y + 6);
    y += 12;
    
    setTextColor(pdf, COLORS.gray);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    
    const meals = [
      { key: 'breakfast', meal: day.breakfast },
      { key: 'lunch', meal: day.lunch },
      { key: 'snack', meal: day.snack },
      { key: 'dinner', meal: day.dinner },
    ];
    
    meals.forEach(({ key, meal }) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      
      if (meal) {
        pdf.text(`${MEAL_NAMES[key]}: ${meal.name}`, 15, y);
        pdf.text(`(${meal.calories} kcal | P:${meal.protein}g C:${meal.carbs}g G:${meal.fats}g)`, 130, y);
        y += 5;
        
        const ingredientsList = meal.ingredients.map(i => `${i.name} (${i.grams}g)`).join(', ');
        pdf.setFontSize(8);
        setTextColor(pdf, [120, 120, 120]);
        pdf.text(`  Ingredientes: ${ingredientsList}`, 15, y);
        pdf.setFontSize(9);
        y += 6;
      }
    });
    
    y += 5;
  });
  
  return y;
}

function addShoppingList(pdf: jsPDF, shoppingList: IngredientItem[], startY: number) {
  let y = startY;
  
  if (y > 200) {
    pdf.addPage();
    y = 20;
  }
  
  y += 10;
  
  setTextColor(pdf, COLORS.navy);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Lista de Compras Consolidada', 15, y);
  y += 10;
  
  const total = shoppingList.reduce((acc, item) => acc + item.bestPrice, 0);
  const savings = shoppingList.reduce((acc, item) => acc + Math.abs(item.priceJumbo - item.priceLider), 0);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  setTextColor(pdf, COLORS.mint);
  pdf.text(`Total: $${total.toLocaleString('es-CL')}`, 15, y);
  setTextColor(pdf, [46, 204, 113]);
  pdf.text(`Ahorro proyectado: $${savings.toLocaleString('es-CL')}`, 80, y);
  y += 15;
  
  const jumboItems = shoppingList.filter(i => i.bestStore === 'Jumbo');
  const liderItems = shoppingList.filter(i => i.bestStore === 'Lider');
  
  if (jumboItems.length > 0) {
    pdf.setFillColor(255, 165, 0);
    pdf.rect(10, y, 90, 6, 'F');
    setTextColor(pdf, [255, 255, 255]);
    pdf.setFontSize(10);
    pdf.text('JUMBO', 55, y + 4.5, { align: 'center' });
    y += 10;
    
    setTextColor(pdf, COLORS.navy);
    pdf.setFontSize(9);
    jumboItems.forEach(item => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(`☐ ${item.name}`, 15, y);
      pdf.text(`${item.commercialUnit}`, 90, y);
      pdf.text(`$${item.bestPrice.toLocaleString('es-CL')}`, 155, y);
      y += 6;
    });
    
    y += 5;
  }
  
  if (liderItems.length > 0) {
    pdf.setFillColor(0, 100, 200);
    pdf.rect(105, y - 6, 95, 6, 'F');
    setTextColor(pdf, [255, 255, 255]);
    pdf.setFontSize(10);
    pdf.text('LÍDER', 152.5, y, { align: 'center' });
    y += 10;
    
    setTextColor(pdf, COLORS.navy);
    pdf.setFontSize(9);
    liderItems.forEach(item => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(`☐ ${item.name}`, 110, y);
      pdf.text(`${item.commercialUnit}`, 175, y);
      pdf.text(`$${item.bestPrice.toLocaleString('es-CL')}`, 195, y, { align: 'right' });
      y += 6;
    });
  }
  
  return y;
}

function addFooter(pdf: jsPDF) {
  setTextColor(pdf, COLORS.gray);
  pdf.setFontSize(8);
  pdf.text(
    'Generado por OptiMeal - Tu plan nutricional inteligente',
    105,
    290,
    { align: 'center' }
  );
}

export function generateNutritionPlanPDF(plan: NutritionPlan): jsPDF {
  const pdf = new jsPDF();
  
  addHeader(pdf, plan);
  
  let y = 50;
  y = addMacroTargets(pdf, plan, y);
  y = addWeeklyPlan(pdf, plan.weeklyPlan, y);
  y = addShoppingList(pdf, plan.shoppingList, y);
  
  addFooter(pdf);
  
  return pdf;
}

export function downloadPDF(plan: NutritionPlan) {
  const pdf = generateNutritionPlanPDF(plan);
  const filename = `OptiMeal_${plan.patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
}
