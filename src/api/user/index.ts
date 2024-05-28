import { ResponseJson } from '@/config/request';
import { UserInfo } from '@/store/modules/types';
import { request } from '@/utils/request';

export const getUserInfo = (): Promise<ResponseJson<UserInfo>> => {
  return request({
    url: '/users/me',
    method: 'get',
  });
};

export const getRoutes = (): Promise<ResponseJson<any>> => {
  return request({
    url: '/access/user_router',
    method: 'get',
  });
};
