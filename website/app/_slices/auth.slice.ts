import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Utilities
import {} from "../utils/withLocalStorage";
// Constants
import { UserState, initialState } from "../_constants/user.constants";
import { UserActions } from "../_actions/user.actions";
import { Response, ErrorResponse } from "../_constants/response.constant";
// Additional Packages
import { loginAsync } from "../_reducers/user.thunks";

export const UserAuthSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  // @ts-ignore
  extraReducers: (builder) => {
    // Hydrate
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
      };
    });
    // Login
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { user, token, tokenExpiration } = action.payload.data;
        return {
          ...state,
          user,
          token,
          tokenExpiration,
        }
      })
      .addCase(loginAsync.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(loginAsync.rejected, (state) => {
        return {
          ...state,
          status: "error",
        };
      });
  },
});

export default UserAuthSlice.reducer;
