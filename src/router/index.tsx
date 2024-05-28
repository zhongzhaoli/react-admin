import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { routesComponentInstance } from './helper.ts';
import { SyncDynamicRouteProp } from './types.ts';
import store from '@/store';
import { fetchUserInfo, selectToken } from '@/store/modules/user.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { getRoutes } from '@/api/user/index.ts';

const Login = lazy(() => import('../views/Login/index.tsx'));

function RouterCom(): JSX.Element {
  const [routes, setRoutes] = useState<SyncDynamicRouteProp[]>([]);
  // 相当于前置守卫
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const token = selectToken(store.getState());
      if (token) {
        // 获取个人信息
        dispatch(fetchUserInfo());
        const { datas } = await getRoutes();
        setRoutes(routesComponentInstance(datas.data));
      }
    }
    fetchData();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      {routes.map((route) => {
        return (
          <Route
            key={route.id}
            path={route.path}
            Component={route.component}
          ></Route>
        );
      })}
    </Routes>
  );
}
export default RouterCom;
