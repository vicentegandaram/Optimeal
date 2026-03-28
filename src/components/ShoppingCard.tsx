import { motion } from 'framer-motion';
import { ShoppingCart, TrendingDown } from 'lucide-react';
import { type Ingredient } from '../types';

interface ShoppingCardProps {
  item: Ingredient;
  onAddToCart?: (item: Ingredient) => void;
  isInCart?: boolean;
}

export function ShoppingCard({ item, onAddToCart, isInCart = false }: ShoppingCardProps) {
  const originalPrice = Math.round(item.price * 1.15);
  const discount = Math.round((1 - item.price / originalPrice) * 100);

  const getEmoji = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('pollo')) return '🍗';
    if (lower.includes('salmón') || lower.includes('salmon')) return '🐟';
    if (lower.includes('arroz')) return '🍚';
    if (lower.includes('quinoa')) return '🌾';
    if (lower.includes('huev')) return '🥚';
    if (lower.includes('palta') || lower.includes('aguacate')) return '🥑';
    if (lower.includes('brócoli') || lower.includes('brocoli')) return '🥦';
    if (lower.includes('espinaca')) return '🥬';
    if (lower.includes('avena')) return '🌾';
    return '🛒';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="relative p-4">
        <div className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <span className="text-4xl">{getEmoji(item.name)}</span>
        </div>

        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingDown size={12} />
            -{discount}%
          </div>
        )}

        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <h3 className="font-semibold text-navy text-sm line-clamp-2">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.quantity}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.store === 'Jumbo' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {item.store}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-navy">${item.price.toLocaleString('es-CL')}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${originalPrice.toLocaleString('es-CL')}</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(item)}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
            isInCart
              ? 'bg-green-100 text-green-600 cursor-default'
              : 'bg-mint text-white hover:bg-mint/90 active:scale-95'
          }`}
        >
          <ShoppingCart size={18} />
          {isInCart ? 'En el carrito' : 'Añadir al carro'}
        </button>
      </div>
    </motion.div>
  );
}
