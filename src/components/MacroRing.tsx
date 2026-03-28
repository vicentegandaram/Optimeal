interface MacroRingProps {
  name: string;
  current: number;
  target: number;
  color: string;
  size?: number;
}

export function MacroRing({ name, current, target, color, size = 100 }: MacroRingProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
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
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{name}</span>
      <span className="text-xs text-gray-400">{current}/{target}g</span>
    </div>
  );
}
