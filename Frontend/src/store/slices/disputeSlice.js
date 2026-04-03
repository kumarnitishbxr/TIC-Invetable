import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// ================= CREATE DISPUTE =================
export const createDispute = createAsyncThunk(
  "dispute/create",
  async ({ jobId, issue }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/dispute", { jobId, issue });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to create dispute");
    }
  }
);

// ================= GET SINGLE DISPUTE =================
export const getDispute = createAsyncThunk(
  "dispute/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/dispute/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch dispute");
    }
  }
);

// ================= LIST DISPUTES =================
export const listDisputes = createAsyncThunk(
  "dispute/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/dispute");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch disputes");
    }
  }
);

// ================= UPDATE DISPUTE =================
export const updateDispute = createAsyncThunk(
  "dispute/update",
  async ({ id, status, resolutionNotes }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/dispute/${id}`, {
        status,
        resolutionNotes,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to update dispute");
    }
  }
);

// ================= SLICE =================
const disputeSlice = createSlice({
  name: "dispute",
  initialState: {
    disputes: [],
    selectedDispute: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearDispute: (state) => {
      state.selectedDispute = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== CREATE =====
      .addCase(createDispute.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDispute.fulfilled, (state, action) => {
        state.loading = false;
        state.disputes.push(action.payload);
      })
      .addCase(createDispute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== LIST =====
      .addCase(listDisputes.pending, (state) => {
        state.loading = true;
      })
      .addCase(listDisputes.fulfilled, (state, action) => {
        state.loading = false;
        state.disputes = action.payload;
      })
      .addCase(listDisputes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== GET ONE =====
      .addCase(getDispute.fulfilled, (state, action) => {
        state.selectedDispute = action.payload;
      })

      // ===== UPDATE =====
      .addCase(updateDispute.fulfilled, (state, action) => {
        const index = state.disputes.findIndex(
          d => d._id === action.payload._id
        );

        if (index !== -1) {
          state.disputes[index] = action.payload;
        }

        if (
          state.selectedDispute &&
          state.selectedDispute._id === action.payload._id
        ) {
          state.selectedDispute = action.payload;
        }
      });
  },
});

export const { clearDispute } = disputeSlice.actions;

export default disputeSlice.reducer;