import { lazy } from 'react';

// 路由组件路径实例化
export const routesComponentInstance = (routes: any): any[] => {
  routes.forEach((route: any) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = '';
      } else {
        const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}');
        route.component = dynamicImport(dynamicViewsModules, route.component);
      }
    }
    if (route.children && route.children.length) {
      route.redirect = route.children[0].path;
      routesComponentInstance(route.children);
    }
  });
  return routes as any[];
};

// 动态引入组件
const dynamicImport = (
  dynamicViewsModules: Record<string, () => Promise<any>>,
  component: string
) => {
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
