import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import routerReducer from './modules/router';

const store = configureStore({
  reducer: {
    user: userReducer,
    router: routerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
