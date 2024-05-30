import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserState } from './types';
import { loginApi, LoginDto } from '@/api/login';
import { getUserInfo } from '@/api/user';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { TOKEN_KEY } from '@/constant/app';

const initialState: UserState = {
  token: getLocalStorage(TOKEN_KEY) || '',
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      const token = action.payload?.token || null;
      if (token) {
        state.token = token;
        setLocalStorage(TOKEN_KEY, token);
      }
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

export const selectUserInfo = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
