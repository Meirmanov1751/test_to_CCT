// store.ts
import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './columnsSlice';

const store = configureStore({
    reducer: {
        columns: columnsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
