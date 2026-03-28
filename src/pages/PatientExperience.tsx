import { Clock, Flame } from 'lucide-react';
import { Layout } from '../components/Layout';
import { MacroRing } from '../components/MacroRing';
import { macros, recipes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export function PatientExperience() {
  const navigate = useNavigate();

  return (
    <Layout title="Mi Plan" showBack>
      <div className="p-4">
        <div className="bg-gradient-to-br from-navy to-gray-800 rounded-2xl p-5 mb-6">
          <h2 className="text-white font-semibold mb-4">Resumen de Macros</h2>
          <div className="flex justify-around">
            {macros.map((macro) => (
              <MacroRing
                key={macro.name}
                name={macro.name}
                current={macro.current}
                target={macro.target}
                color={macro.color}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recetas del Día</h3>
          <span className="text-sm text-mint font-medium">Ver todas</span>
        </div>

        <div className="space-y-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/checkout')}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                {recipe.image}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Flame size={14} />
                    {recipe.calories} kcal
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    {recipe.time}
                  </span>
                </div>
              </div>
              <div className="text-mint">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-navy text-white font-semibold py-4 rounded-xl hover:bg-navy/90 transition-colors shadow-lg"
        >
          Ir al Supermercado
        </button>
      </div>
    </Layout>
  );
}
