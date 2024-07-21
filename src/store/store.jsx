import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import tvShowSlice from "./reducers/tvShowSlice";
import peopleSlice from "./reducers/peopleSlice";
import seasonSlice from "./reducers/seasonSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv: tvShowSlice,
    people: peopleSlice,
    season: seasonSlice,
  },
});
