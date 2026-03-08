import { Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/navbar';

export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
