import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    loadSeason: (state, action) => {
      state.info = action.payload;
    },
    removeSeason: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadSeason, removeSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
