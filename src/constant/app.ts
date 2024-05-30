import { getAppEnvConfig } from '../utils/env';

const { VITE_GLOB_APP_NAME } = getAppEnvConfig();

// 项目名称
export const PROJECT_NAME: string = VITE_GLOB_APP_NAME;

// Token 本地存储Key
export const TOKEN_KEY = `USER_TOKEN`;
