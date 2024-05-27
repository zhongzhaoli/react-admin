import { ResponseJson } from '@/config/request';
import { request } from '@/utils/request';

export interface LoginDto {
  user_name: string;
  user_passwd: string;
}

export const loginApi = (
  data: LoginDto
): Promise<ResponseJson<{ token: string }>> => {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      ...data,
      user_id: '',
    },
  });
};
