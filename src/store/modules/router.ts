import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RouterState } from './types';
import { getRoutes } from '@/api/user';
import { RootState } from '..';

const initialState: RouterState = {
  syncRouter: [],
};

export const routerSlice = createSlice({
  name: 'Router',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRouter.fulfilled, (state, action) => {
      state.syncRouter = action.payload || [];
    });
  },
});

export const fetchRouter = createAsyncThunk('user/router', async () => {
  try {
    const { datas } = await getRoutes();
    return datas.data;
  } catch (err) {
    console.log('个人路由接口：', err);
  }
});

export const selectSyncRouter = (state: RootState) => state.router.syncRouter;

export default routerSlice.reducer;
