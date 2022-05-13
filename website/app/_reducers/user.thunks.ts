import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserActions } from '../_actions/user.actions';
import { UserState } from '../_constants/user.constants';
import { Response, ErrorResponse } from '../_constants/response.constant';

import { AuthServices } from '../_services/auth.services';

export const loginAsync = createAsyncThunk<
  Response,
  {
    email: string,
    password: string
  },
  { rejectValue: ErrorResponse }
>(
  UserActions.LOGIN_REQUEST,
  async ({ email, password }, { rejectWithValue }) => {
    const response = await AuthServices.fetchLogin(email, password);
    if (response.status >= 200 && response.status < 300) {
      return response as Response;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  }
);
