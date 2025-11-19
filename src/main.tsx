import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: () => <App />,
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
