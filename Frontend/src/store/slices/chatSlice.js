import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// ================= START CHAT =================
export const startChat = createAsyncThunk(
  "chat/startChat",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/chat/start/${jobId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to start chat");
    }
  }
);

// ================= GET MESSAGES =================
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/chat/${roomId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch messages");
    }
  }
);

// ================= SEND MESSAGE =================
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ roomId, text }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/chat/send/${roomId}`, { text });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to send message");
    }
  }
);

// ================= SLICE =================
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: null,
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {
    // 🔥 Real-time (socket) message push
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.chat = null;
      state.messages = [];
    }
  },

  extraReducers: (builder) => {
    builder

      // ===== START CHAT =====
      .addCase(startChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
      })
      .addCase(startChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== GET MESSAGES =====
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== SEND MESSAGE =====
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { addMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;