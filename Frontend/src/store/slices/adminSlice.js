import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

// ================= OVERVIEW =================
export const getOverview = createAsyncThunk(
  "admin/overview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/overview");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch overview");
    }
  }
);

// ================= USERS =================
export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/users");
      return res.data.data.users;
    } catch (err) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

// ================= JOBS =================
export const getJobs = createAsyncThunk(
  "admin/getJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/jobs");
      return res.data.data.jobs;
    } catch (err) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

// ================= DISPUTES =================
export const getDisputes = createAsyncThunk(
  "admin/getDisputes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/disputes");
      return res.data.data.disputes;
    } catch (err) {
      return rejectWithValue("Failed to fetch disputes");
    }
  }
);

// ================= BLOCK USER =================
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.put(`/api/admin/block/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue("Failed to block user");
    }
  }
);

// ================= UNBLOCK USER =================
export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.put(`/api/admin/unblock/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue("Failed to unblock user");
    }
  }
);

// ================= DELETE USER =================
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue("Failed to delete user");
    }
  }
);

// ================= DELETE JOB =================
export const deleteJob = createAsyncThunk(
  "admin/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/job/${jobId}`);
      return jobId;
    } catch (err) {
      return rejectWithValue("Failed to delete job");
    }
  }
);

// ================= RESOLVE DISPUTE =================
export const resolveDispute = createAsyncThunk(
  "admin/resolveDispute",
  async ({ disputeId, resolutionNotes }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/admin/dispute/${disputeId}`, {
        resolutionNotes,
      });
      return res.data.data.dispute;
    } catch (err) {
      return rejectWithValue("Failed to resolve dispute");
    }
  }
);

// ================= SLICE =================
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    overview: null,
    users: [],
    jobs: [],
    disputes: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===== OVERVIEW =====
      .addCase(getOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(getOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== USERS =====
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // ===== JOBS =====
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })

      // ===== DISPUTES =====
      .addCase(getDisputes.fulfilled, (state, action) => {
        state.disputes = action.payload;
      })

      // ===== BLOCK USER =====
      .addCase(blockUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u._id === action.payload);
        if (user) user.isBlocked = true;
      })

      // ===== UNBLOCK USER =====
      .addCase(unblockUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u._id === action.payload);
        if (user) user.isBlocked = false;
      })

      // ===== DELETE USER =====
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      })

      // ===== DELETE JOB =====
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => j._id !== action.payload);
      })

      // ===== RESOLVE DISPUTE =====
      .addCase(resolveDispute.fulfilled, (state, action) => {
        const index = state.disputes.findIndex(
          d => d._id === action.payload._id
        );
        if (index !== -1) {
          state.disputes[index] = action.payload;
        }
      });
  },
});

export default adminSlice.reducer;