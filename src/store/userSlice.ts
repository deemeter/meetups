import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../utils/constants";
import { parseJwt } from "../utils/parseJwt";
import { AuthData } from "../utils/interfaces";
import axios from "axios";

export interface UserState {
  id: number | null;
  isLoading: boolean;
  isAuth: boolean;
  token: string | null;
  roles: Array<string>;
  name: string | null;
  error: string | undefined;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData: AuthData) => {
    const request = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    const response = await request.data;
    return { response: response, loginData: loginData };
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (regData: AuthData) => {
    const request = await axios.post(
      `${API_BASE_URL}/auth/registration`,
      regData
    );
    const response = await request.data;
    return { response: response, loginData: regData };
  }
);

const initialState: UserState = {
  id: null,
  isLoading: false,
  isAuth: false,
  token: null,
  roles: [],
  name: null,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.id = null;
      state.isLoading = false;
      state.isAuth = false;
      state.name = null;
      state.roles = [];
      state.error = undefined;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.token = null;
        state.error = undefined;
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.response.token) {
          let user = parseJwt(action.payload.response.token);
          state.id = user.id;
          state.isLoading = false;
          state.isAuth = true;
          state.token = action.payload.response.token;
          state.roles = user.roles.map((role: any) => role.name);
          state.name = action.payload.loginData.fio;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.error = action.error.message;
        state.isAuth = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.token = null;
        state.error = undefined;
        state.isAuth = false;
      })
      .addCase(registerUser.fulfilled, () => {});
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
