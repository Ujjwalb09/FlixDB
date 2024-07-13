import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const peopleSlice = createSlice({
  name: "People",
  initialState,
  reducers: {
    loadPeople: (state, action) => {
      state.info = action.payload;
    },
    removePeople: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadPeople, removePeople } = peopleSlice.actions;

export default peopleSlice.reducer;
