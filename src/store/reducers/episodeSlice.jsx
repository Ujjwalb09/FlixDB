import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    loadEpisode: (state, action) => {
      state.info = action.payload;
    },
    removeEpisode: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadEpisode, removeEpisode } = episodeSlice.actions;

export default episodeSlice.reducer;
