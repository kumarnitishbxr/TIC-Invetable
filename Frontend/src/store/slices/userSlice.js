import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// ================= FETCH PROFILE =================
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user/profile");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch profile",err.message);
    }
  }
);

// ================= UPDATE PROFILE =================
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/user/profile", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ================= DELETE PROFILE =================
export const deleteProfile = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/api/user/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue("Delete failed",err.message);
    }
  }
);

// ================= UPDATE LOCATION =================
export const updateLocation = createAsyncThunk(
  "user/updateLocation",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/user/location", { lat, lng });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Location update failed",err.message);
    }
  }
);

// ================= NEARBY USERS =================
export const getNearbyUsers = createAsyncThunk(
  "user/getNearbyUsers",
  async ({ lat, lng, distance }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/api/user/nearby?lat=${lat}&lng=${lng}&distance=${distance}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch nearby users",err.message);
    }
  }
);

// ================= GET USER BY ID =================
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch user",err.message);
    }
  }
);

// ================= RATE USER =================
export const rateUser = createAsyncThunk(
  "user/rateUser",
  async ({ id, rating }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/user/rate/${id}`, { rating });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Rating failed",err.message);
    }
  }
);

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    nearbyUsers: [],
    selectedUser: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.nearbyUsers = [];
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== FETCH PROFILE =====
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE PROFILE =====
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // ===== DELETE PROFILE =====
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
      })

      // ===== UPDATE LOCATION =====
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // ===== NEARBY USERS =====
      .addCase(getNearbyUsers.fulfilled, (state, action) => {
        state.nearbyUsers = action.payload;
      })

      // ===== GET USER BY ID =====
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // ===== RATE USER =====
      .addCase(rateUser.fulfilled, (state, action) => {
        if (state.selectedUser) {
          state.selectedUser.rating = action.payload.rating;
          state.selectedUser.ratingCount = action.payload.ratingCount;
        }
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;