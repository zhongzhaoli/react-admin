export interface UserInfo {
  access_code: number;
  authorization: string;
  department_id: number;
  last_login: string;
  update_time: string;
  user_id: string;
  user_name: string;
}

export interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
}
