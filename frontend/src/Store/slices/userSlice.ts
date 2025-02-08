import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export interface UserState {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  teams: {
    _id: string;
    name: string;
    description: string;
    members: string[];
  }[];
}

interface AuthState {
  user: UserState | null;
  error: string | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

interface LoginReturn {
  token: string;
  status: boolean;
  message: string;
}

interface checkAuthReturn {
  status: boolean;
  message: string;
  user: UserState;
}

interface commonReturn {
  status: boolean;
  message: string;
}

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Login Failed";
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Logout Failed";
        state.isLoading = false;
      });
  },
});

export const signUp = createAsyncThunk<
  LoginReturn,
  void,
  { rejectValue: string }
>("auth/signUp", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/auth/google/`);
    console.log(response);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const checkAuth = createAsyncThunk<
  checkAuthReturn,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/auth/checkAuth`);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});
export const logout = createAsyncThunk<
  commonReturn,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/auth/logout`);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

export default authSlice.reducer;
