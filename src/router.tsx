import {
  createRouter,
  createRootRoute,
  createRoute
} from '@tanstack/react-router';
import { RootLayout } from '@/components/layout';
import { OverviewPage } from '@/pages/overview';

const rootRoute = createRootRoute({
  component: RootLayout
});

const overviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: OverviewPage
});

const routeTree = rootRoute.addChildren([overviewRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
