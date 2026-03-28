import { ShoppingCart, Store, Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ingredients } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const jumboIngredients = ingredients.filter((i) => i.store === 'Jumbo');
const liderIngredients = ingredients.filter((i) => i.store === 'Lider');

export function SmartCheckout() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>(ingredients.map((i) => i.id));

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalItems = selectedItems.length;
  const totalPrice = selectedItems.length * 2490;

  return (
    <Layout title="Lista de Compras" showBack>
      <div className="p-4 pb-28">
        <div className="bg-mint/10 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-mint" size={24} />
            <div>
              <p className="font-semibold text-gray-800">{totalItems} artículos</p>
              <p className="text-sm text-gray-500">Ahorro estimado: $12.500</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-mint">${totalPrice.toLocaleString('es-CL')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Store className="text-orange-500" size={20} />
              <h3 className="font-semibold text-gray-800">Jumbo</h3>
              <span className="text-sm text-gray-400 ml-auto">{jumboIngredients.length} productos</span>
            </div>
            <div className="space-y-2">
              {jumboIngredients.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? 'border-mint bg-mint/5'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedItems.includes(item.id)
                        ? 'border-mint bg-mint'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-700">$2.490</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Store className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-800">Lider</h3>
              <span className="text-sm text-gray-400 ml-auto">{liderIngredients.length} productos</span>
            </div>
            <div className="space-y-2">
              {liderIngredients.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? 'border-mint bg-mint/5'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedItems.includes(item.id)
                        ? 'border-mint bg-mint'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-700">$2.490</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-[450px] mx-auto">
        <button
          onClick={() => navigate('/')}
          className="w-full bg-navy text-white font-semibold py-4 rounded-xl hover:bg-navy/90 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Push to Supermarket
        </button>
      </div>
    </Layout>
  );
}
