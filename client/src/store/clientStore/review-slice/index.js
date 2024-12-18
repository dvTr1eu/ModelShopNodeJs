import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/review/addProductReview",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:8088/v1/api/client/review/add`,
      formData
    );
    return response.data;
  }
);

export const getReview = createAsyncThunk(
  "/review/getProductReview",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8088/v1/api/client/review/${id}`
    );
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
