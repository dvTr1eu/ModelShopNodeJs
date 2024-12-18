import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getAllFilteredProduct = createAsyncThunk(
  "/product/getAllClientProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:8088/v1/api/client/product/get?${query}`
    );
    return result?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/product/getProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:8088/v1/api/client/product/get/${id}`
    );
    return result?.data;
  }
);

const clientProductSlice = createSlice({
  name: "clientProduct",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllFilteredProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = [];
      });
  },
});

export const { setProductDetails } = clientProductSlice.actions;

export default clientProductSlice.reducer;
