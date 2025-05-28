// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice';
import checkboxReducer from '../slices/checkboxSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
      checkboxes: checkboxReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
