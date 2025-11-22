import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider
} from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Home />
});

const router = createRouter({ routeTree: rootRoute });

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
