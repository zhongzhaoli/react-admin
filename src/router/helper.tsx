import { lazy, Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { SyncRouteProp } from './types.ts';
import { AuthNoLogin } from './AuthProvide.tsx';

// 路由组件路径实例化
export const routesComponentInstance = (
  routes: SyncRouteProp[]
): RouteObject[] => {
  const newRoutes: RouteObject[] = [];
  routes.forEach((route: any) => {
    const obj: RouteObject = {
      path: route.path,
    };
    if (route.component) {
      if (route.component === 'Layout') {
        if (route.children && route.children.length) {
          obj.element = (
            <Suspense>
              <Outlet />
              <Navigate to={route.children[0].path} replace />
            </Suspense>
          );
        }
      } else {
        const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}');

        const Component = dynamicImport(dynamicViewsModules, route.component);
        if (Component)
          obj.element = (
            <Suspense>
              <AuthNoLogin>
                <Component />
              </AuthNoLogin>
            </Suspense>
          );
      }
    }
    if (route.children && route.children.length) {
      obj.children = routesComponentInstance(route.children);
    }
    newRoutes.push(obj);
  });
  return newRoutes;
};

// 动态引入组件
const dynamicImport = (
  dynamicViewsModules: Record<string, () => Promise<any>>,
  component: string
): React.LazyExoticComponent<() => JSX.Element> | void => {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '');
    const startFlag = component.startsWith('/');
    const startIndex = startFlag ? 0 : 1;
    return k.substring(startIndex, k.length) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return lazy(dynamicViewsModules[matchKey]);
  }
  console.warn('找不到此组件');
};
