import { Link, useRouterState } from '@tanstack/react-router';
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Overview', path: '/' },
  { title: 'Budgets', path: '/budgets' },
  { title: 'Investments', path: '/investments' }
];

export function AppHeader() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-10 py-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
          <Wallet className="size-4" />
        </div>
        <span className="text-xl font-black tracking-tight uppercase text-primary">Finances</span>
      </div>
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path as '/'}
              className={cn(
                'text-sm font-semibold transition-colors',
                isActive
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
