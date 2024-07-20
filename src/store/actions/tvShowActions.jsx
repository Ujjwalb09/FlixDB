import axios from "../../utils/axios";
export { removeTvShow } from "../reducers/tvShowSlice";
import { loadTvShow } from "../reducers/tvShowSlice";

export const asyncLoadTvShow = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const external_ids = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchProvider = await axios.get(`/tv/${id}/watch/providers`);

    let tvShowDetailsObj = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.name),
      videos: videos.data.results.find((obj) => obj.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN,
    };

    dispatch(loadTvShow(tvShowDetailsObj));
  } catch (error) {
    console.log(error);
  }
};
