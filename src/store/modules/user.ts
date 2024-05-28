import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserInfo, UserState } from './types';
import { loginApi, LoginDto } from '@/api/login';
import { getUserInfo } from '@/api/user';

const initialState: UserState = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc0ODc3ODMsInVzZXJfaWQiOiI1MzM2MDM1ZWM3OTY0OWRmYTM0Yzk4ZTc5ODIyOTRkOCIsInVzZXJfbmFtZSI6Inp6bCIsInBhc3N3b3JkIjoiJDJiJDEyJC43VVY3Y0RBS2w4UGxXa2Mud1VUV2VFOHJlWEdLQ0RDZGZQMy9CSmhhWHEvamxOcHdxWElHIiwiZGVwYXJ0bWVudF9pZCI6MSwibGFzdF9sb2dpbiI6IjIwMjQtMDUtMjhUMTU6NTY6MDYiLCJhY2Nlc3NfY29kZSI6MCwidXBkYXRlX3RpbWUiOiIyMDI0LTA1LTI4VDE1OjU2OjA2IiwiYXV0aG9yaXphdGlvbiI6IiJ9.DHTjZjDuuTdrTE3VyC54qA5qp6UEr10ymnB-7H6aeq0',
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.token = action.payload?.token || null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload || null;
    });
  },
});

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: LoginDto) => {
    try {
      const { datas } = await loginApi(data);
      return datas;
    } catch (err) {
      console.log('登录接口：', err);
    }
  }
);

export const fetchUserInfo = createAsyncThunk('user/userInfo', async () => {
  try {
    const { datas } = await getUserInfo();
    return datas;
  } catch (err) {
    console.log('获取个人信息接口：', err);
  }
});

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
