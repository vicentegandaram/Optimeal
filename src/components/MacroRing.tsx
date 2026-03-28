import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MacroRingProps {
  name: string;
  current: number;
  target: number;
  color: string;
  size?: number;
}

export function MacroRing({ name, current, target, color, size = 100 }: MacroRingProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getStatusIcon = () => {
    if (percentage >= 90) return <TrendingUp size={14} className="text-mint" />;
    if (percentage <= 50) return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-yellow-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-navy">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-sm font-semibold text-navy">{name}</span>
          {getStatusIcon()}
        </div>
        <span className="text-xs text-gray-400">{current}/{target}g</span>
      </div>
    </motion.div>
  );
}
