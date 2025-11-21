import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import Home from './pages/Home.tsx';

const rootRoute = createRootRoute({
  component: () => <Home />,
});

const router = createRouter({ routeTree: rootRoute });

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
