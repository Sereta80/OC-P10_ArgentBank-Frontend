import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// --- LES THUNKS (Les livreurs d'API) ---

// 1. Thunk de connexion : envoie email/password et récupère le Token
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      return response.data.body.token; // Donnée transmise au 'fulfilled'
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Identifiants incorrects'
      );
    }
  }
);

// 2. Thunk de profil : envoie le Token pour récupérer les infos utilisateur
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body; // Retourne { id, email, firstName, lastName }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Impossible de charger le profil'
      );
    }
  }
);

// --- LE SLICE (Le tiroir de données) ---

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
    // Action synchrone de déconnexion
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
      // Réponses du Thunk loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload; // action.payload contient le Token
        state.isConnected = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Message d'erreur
      })
      // Réponses du Thunk fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Stocke les infos (firstName, lastName)
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;