import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { AuthData } from "../utils/interfaces";
export interface IUser {
  email: string;
  fio: string;
  role: Array<string>;
  id: number;
  password: string;
}

export interface IUserlist {
  users: Array<IUser>;
}

const initialState: IUserlist = {
  users: [],
};

export const fetchUserlist = createAsyncThunk(
  "userlist/fetchUserlist",
  async (token: string) => {
    const request = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.data;
    return response;
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "userlist/fetchDeleteUser",
  async (arg: { id: string; token: string }) => {
    const request = await axios.delete(`${API_BASE_URL}/user/${arg.id}`, {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
    });
    const response = await request.data;
    return response;
  }
);

export const fetchEditUserRole = createAsyncThunk(
  "userlist/fetchEditUserRole",
  async (arg: { id: number; role: string; token: string }) => {
    const request = await axios.post(
      `${API_BASE_URL}/user/role`,
      {
        names: [`${arg.role}`],
        userId: arg.id,
      },
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const response = await request.data;
    return response;
  }
);

export const fetchEditUserData = createAsyncThunk(
  "userlist/fetchEditUserData",
  async (arg: { userData: AuthData; id: number; token: string }) => {
    const request = await axios.put(
      `${API_BASE_URL}/user/${arg.id}`,
      arg.userData,
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const response = await request.data;
    return response;
  }
);

export const userlistSlice = createSlice({
  name: "userlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserlist.fulfilled, (state, action) => {
        let newUsers: Array<IUser> = [];
        action.payload.map((item: any) => {
          let curr = {
            email: item.email,
            id: item.id,
            fio: item.fio,
            role: item.roles.map((x: any) => x.name),
            password: item.password,
          };
          newUsers.push(curr);
        }, (state.users = newUsers));
      })
      .addCase(fetchUserlist.pending, () => {})
      .addCase(fetchUserlist.rejected, () => {})
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        const newArray = state.users.filter(
          (item) => item.id !== action.payload.id
        );
        state.users = newArray;
      })
      .addCase(fetchEditUserRole.fulfilled, () => {
        console.log("role updated");
      })
      .addCase(fetchEditUserData.fulfilled, () => {
        console.log("user data updated");
      });
  },
});

export const {} = userlistSlice.actions;
export default userlistSlice.reducer;
