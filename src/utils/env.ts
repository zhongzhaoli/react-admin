// 获取env环境变量
export function getAppEnvConfig() {
  const ENV = import.meta.env;
  return ENV;
}
