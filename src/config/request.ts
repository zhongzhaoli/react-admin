import { getAppEnvConfig } from '@/utils/env';

const { VITE_GLOB_API_URL } = getAppEnvConfig();

// 请求路径前缀
export const BaseURL = VITE_GLOB_API_URL;

// 超时时间
export const Timeout = 60000;

// 默认请求格式
export const ContentType = 'application/json;charset=UTF-8';

// 返回code
export enum ResponseCode {
  SUCCESS = 200,
  ERROR = 422,
  BODYERROR = 400,
  UNAUTHORIZATION = 401,
  SERVERERROR = 500,
}
// 返回信息格式
export interface ResponseJson<T = string> {
  code: ResponseCode;
  msg: string;
  datas: T;
}

// 返回分页信息格式
export interface ResponsePageJson<T = any> {
  code: ResponseCode;
  msg: string;
  datas: PageListJson<T>;
}

// 分页数据格式
export interface PageListJson<T> {
  data: T[];
  total: number;
}
