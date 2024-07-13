import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvSlice = createSlice({
  name: "TvShow",
  initialState,
  reducers: {
    loadTvShow: (state, action) => {
      state.info = action.payload;
    },
    removeTvShow: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadTvShow, removeTvShow } = tvSlice.actions;

export default tvSlice.reducer;
