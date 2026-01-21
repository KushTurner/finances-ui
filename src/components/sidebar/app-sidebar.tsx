import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Wallet, TrendingUp } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Overview', path: '/', icon: LayoutDashboard },
  { title: 'Budgets', path: '/budgets', icon: Wallet },
  { title: 'Investments', path: '/investments', icon: TrendingUp }
];

export function AppSidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <span className="text-xl font-bold">Finances</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                >
                  <Link to={item.path}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
