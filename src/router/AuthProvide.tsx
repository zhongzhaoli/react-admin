import { useAppSelector } from '@/store/hooks.ts';
import { selectUserInfo } from '@/store/modules/user.ts';
import { Navigate } from 'react-router-dom';
// import { SyncDynamicRouteProp } from './types';

interface Props {
  children: JSX.Element;
}

// 没有登录 跳转登录页面
export function AuthNoLogin(props: Props) {
  const userInfo = useAppSelector(selectUserInfo);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}
