import axios from "../../utils/axios";
export { removeMovie } from "../reducers/movieSlice";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const external_ids = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProvider = await axios.get(`/movie/${id}/watch/providers`);

    let movieDetailsObj = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((obj) => obj.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN,
    };

    dispatch(loadMovie(movieDetailsObj));
  } catch (error) {
    console.log(error);
  }
};
