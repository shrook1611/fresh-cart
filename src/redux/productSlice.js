import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getProducts = createAsyncThunk("products/getProducts", async () => {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  console.log(data);
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    brands: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      console.log(action.payload.data, "ewhdkej");
      state.products = action.payload.data;
    }),
      builder.addCase(getProducts.pending, (state, action) => {
        console.log(action);
      });
  },
});

export const productReducer = productSlice.reducer;
