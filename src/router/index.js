import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { LoadingBar } from 'quasar';
// import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
    extendRoutes: routes => {
      return setupLayouts(
        routes.map(route => {
          if (route.path.includes('admin')) {
            route = {
              ...route,
              meta: {
                ...route.meta,
                layout: 'admin',
              },
            };
          }
          return route;
        }),
      );
    },
  });

  Router.beforeEach(() => {
    LoadingBar.start();
  });

  Router.afterEach(() => {
    LoadingBar.stop();
  });

  return Router;
});
