import axios from "../../utils/axios";
export { removeSeason } from "../reducers/seasonSlice";
import { loadSeason } from "../reducers/seasonSlice";

export const asyncLoadSeason =
  (seriesId, seasonNumber) => async (dispatch, getState) => {
    console.log(seriesId, seasonNumber);
    try {
      const details = await axios.get(`/tv/${seriesId}/season/${seasonNumber}`);
      const videos = await axios.get(
        `/tv/${seriesId}/season/${seasonNumber}/videos`
      );

      let seasonDetailsObj = {
        details: details.data,
        videos: videos.data.results.find((obj) => obj.type === "Trailer"),
      };

      dispatch(loadSeason(seasonDetailsObj));
    } catch (error) {
      console.log(error);
    }
  };
