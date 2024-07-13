import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import tvShowSlice from "./reducers/tvShowSlice";
import peopleSlice from "./reducers/peopleSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv: tvShowSlice,
    people: peopleSlice,
  },
});
