import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listApi from "../../api/listApi";

export const fetchTrending = createAsyncThunk(
  "gallery/fetchTrending",
  async (params, thunkAPI) => {
    const listTrending = await listApi.fetchTrending(params);
    console.log('listTrending', listTrending)
    return listTrending;
  }
);

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    listTrending: [],
    pagination: {},
    meta: {},

  },
  extraReducers: {
    [fetchTrending.pending]: (state) => {
      state.loading = true;
    },
    [fetchTrending.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchTrending.fulfilled]: (state, action) => {
      const { data = [], pagination = {}, meta = {} } = action.payload;
      state.loading = false;
      state.listTrending = data;
      state.pagination = pagination;
      state.meta = meta;
    },
  },
});

export default gallerySlice.reducer;
