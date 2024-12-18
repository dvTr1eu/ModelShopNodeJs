import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/product/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:8088/v1/api/admin/product/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const getAllProduct = createAsyncThunk(
  "/product/getAllProduct",
  async () => {
    const result = await axios.get(
      "http://localhost:8088/v1/api/admin/product/getAll"
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/product/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:8088/v1/api/admin/product/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/product/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:8088/v1/api/admin/product/delete/${id}`
    );
    return result?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
