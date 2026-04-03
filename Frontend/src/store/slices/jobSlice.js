import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const createJob = createAsyncThunk(
  "job/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/job", formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const getJob = createAsyncThunk(
  "job/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/job/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch job");
    }
  }
);

export const listJobs = createAsyncThunk(
  "job/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/job");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

export const nearbyJobs = createAsyncThunk(
  "job/nearby",
  async ({ lat, lng, maxDistance, skill }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/api/job/nearby?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}&skill=${skill || ""}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch nearby jobs");
    }
  }
);

export const applyJob = createAsyncThunk(
  "job/apply",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/job/apply/${id}`, formData);
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Apply failed");
    }
  }
);

export const assignJob = createAsyncThunk(
  "job/assign",
  async ({ id, labourId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/job/assign/${id}`, { labourId });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Assign failed");
    }
  }
);

export const completeJob = createAsyncThunk(
  "job/complete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/job/complete/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Complete failed");
    }
  }
);

export const myJobs = createAsyncThunk(
  "job/myJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/job/my");
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch my jobs");
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    nearbyJobs: [],
    myJobs: [],
    selectedJob: null,
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    clearJob: (state) => {
      state.selectedJob = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload);
      })

      .addCase(listJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(listJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })

      .addCase(getJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
      })

      .addCase(nearbyJobs.fulfilled, (state, action) => {
        state.nearbyJobs = action.payload;
      })

      .addCase(applyJob.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })

      .addCase(assignJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          j => j._id === action.payload._id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      .addCase(completeJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          j => j._id === action.payload._id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      .addCase(myJobs.fulfilled, (state, action) => {
        state.myJobs = action.payload;
      });
  },
});

export const { clearJob } = jobSlice.actions;

export default jobSlice.reducer;