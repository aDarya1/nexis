import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

function getInitialAuthState(): AuthState {
  const saved = localStorage.getItem("authUser");
  if (saved) {
    try {
      const user = JSON.parse(saved);
      return { user, isAuthenticated: true, loading: false, error: null };
    } catch {
      /* empty */
    }
  }
  return { user: null, isAuthenticated: false, loading: false, error: null };
}

const initialState: AuthState = getInitialAuthState();

// Async thunk for registration
export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      console.log("Registering user:", { email, name, password });
      // Simulate API call - replace with real fetch
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user: User = { id: Date.now().toString(), name, email };
      localStorage.setItem("authUser", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  },
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      console.log("Logging in user:", { email, password });
      // Simulate API call - replace with real fetch
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user: User = { id: "1", name: "User", email };
      localStorage.setItem("authUser", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
