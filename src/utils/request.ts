import axios, {
  type AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  BaseURL as baseURL,
  Timeout as timeout,
  ContentType,
  ResponseCode,
} from '@/config/request';
import store from '@/store';
import { selectToken } from '@/store/modules/user';
import { message } from 'antd';

// 请求拦截器
function useRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = selectToken(store.getState());
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}

// 响应拦截器
function useResponseInterceptor(response: AxiosResponse<any, any>) {
  const responseData = response.data;
  const code = responseData.code;
  switch (code) {
    case ResponseCode.SUCCESS:
      break;
    case ResponseCode.BODYERROR:
      message.error(responseData.msg || '请求参数错误');
      return Promise.reject(responseData);
    case ResponseCode.UNAUTHORIZATION:
      message.error('授权已失效，请重新登录');
      break;
    case ResponseCode.SERVERERROR:
      message.error('服务器错误，请联系管理员');
      return Promise.reject(responseData);
    default:
      return Promise.reject(responseData);
  }
  return responseData;
}

// 创建请求本体
function createService(): AxiosInstance {
  // 请求路径 + 超时时间
  const instance = axios.create({
    baseURL,
    timeout,
  });
  // 默认请求格式
  instance.defaults.headers.post['Content-Type'] = ContentType;
  // 请求拦截器
  instance.interceptors.request.use(useRequestInterceptor, (error) => {
    console.log(`请求拦截：`, error);
    return Promise.reject(error);
  });
  // 响应拦截器
  instance.interceptors.response.use(useResponseInterceptor, (error) => {
    console.log(`响应拦截 - 网络错误：`, error);
    message.error('网络错误，请联系管理员');
    return Promise.reject(error);
  });
  return instance;
}

// 创建请求回调
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config);
  };
}

// 创建请求实例
const service: AxiosInstance = createService();

export const request = createRequest(service);
