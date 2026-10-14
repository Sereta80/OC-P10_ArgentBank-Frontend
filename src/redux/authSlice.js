import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// --- THUNKS ---

// 1. Connection thunk : send email/password et get Token
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      return response.data.body.token; // Data transmitted to the 'fulfilled' state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Identifiants incorrects'
      );
    }
  }
);

// 2. Profile thunk : send Token to get user infos
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body; // Return { id, email, firstName, lastName }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Impossible de charger le profil'
      );
    }
  }
);

// 3. Thunk to modify user name (PUT method)
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (newUserName, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const currentUser = state.auth.user;

      const response = await axios.put(
        `${API_URL}/user/profile`,
        {
          userName: newUserName,
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.body; // Retourne l'objet user complet mis à jour par l'API
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Échec de la mise à jour du username'
      );
    }
  }
);

// --- SLICE ---

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isConnected: false,
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Synchronous disconnection action
    logout: (state) => {
      state.token = null;
      state.isConnected = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Responses from the loginUser thunk
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload; // action.payload contains Token
        state.isConnected = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error Message
      })

      // Responses from the fetchUserProfile Thunk
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Store infos (firstName, lastName)
      })

      // Responses from the updateUserProfile Thunk
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // On remplace par le profil mis à jour renvoyé par l'API
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;