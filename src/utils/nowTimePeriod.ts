// 判断当前时间段
type TimePeriod = 'morning' | 'afternoon' | 'night';
export const timePeriodZh: { [key in TimePeriod]: string } = {
  morning: '早上好',
  afternoon: '下午好',
  night: '晚上好',
};
export function nowTimePeriod(): 'morning' | 'afternoon' | 'night' {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 19) {
    return 'afternoon';
  } else {
    return 'night';
  }
}
