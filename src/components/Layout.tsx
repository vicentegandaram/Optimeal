import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
}

export function Layout({ children, title, showBack = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation title={title} showBack={showBack} />
      <main className="max-w-[450px] mx-auto bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}
