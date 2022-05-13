import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";

import UserAuthSlices from "./_slices/auth.slice";

const store = configureStore({
    reducer: {
        auth: UserAuthSlices
    },
    devTools: process.env.NODE_ENV !== "production"
});

const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore);
