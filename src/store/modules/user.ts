import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserInfo, UserState } from './types';
import { loginApi, LoginDto } from '@/api/login';

const initialState: UserState = {
  token: null,
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
      state.token = action.payload?.token || '';
    });
  },
});

export const fetchLogin = createAsyncThunk('login', async (data: LoginDto) => {
  try {
    const { datas } = await loginApi(data);
    return datas;
  } catch (err) {
    console.log('登录接口：', err);
  }
});

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
