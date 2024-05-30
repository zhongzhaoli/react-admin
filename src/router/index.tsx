import { RouteObject, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { routesComponentInstance } from './helper.tsx';
import store from '@/store';
import { fetchUserInfo, selectToken } from '@/store/modules/user.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { fetchRouter } from '@/store/modules/router.ts';

const Login = lazy(() => import('../views/Login/index.tsx'));
// const ErrorPage404 = lazy(() => import('../views/errorPage/404.tsx'));
const Layout = lazy(() => import('../layout/index.tsx'));

function RouterComponent() {
  const [routes, setRoutes] = useState<RouteObject[]>([]);
  // 相当于前置守卫
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = selectToken(store.getState());

    async function fetchData() {
      // 获取个人信息
      await dispatch(fetchUserInfo());
      // 获取路由信息
      const { payload } = await dispatch(fetchRouter());
      if (payload) {
        // 动态注册路由
        setRoutes(routesComponentInstance(payload));
      }
    }
    if (token) {
      fetchData();
    }
  }, [dispatch]);
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Layout />,
      children: routes || [],
    },
  ]);
  return element;
}
export default RouterComponent;
