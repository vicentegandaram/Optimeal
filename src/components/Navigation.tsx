import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  showBack?: boolean;
  title: string;
}

export function Navigation({ showBack = false, title }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-navy text-white px-4 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
        <Menu size={20} />
      </button>
    </nav>
  );
}
