import axios from "../../utils/axios";
export { removeEpisode } from "../reducers/episodeSlice";
import { loadEpisode } from "../reducers/episodeSlice";

export const asyncLoadEpisode =
  (seriesId, seasonNumber, episodeNumber) => async (dispatch, getState) => {
    try {
      const details = await axios.get(
        `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`
      );
      const videos = await axios.get(
        `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`
      );

      let episodeDetailsObj = {
        details: details.data,
        videos: videos.data.results,
      };

      dispatch(loadEpisode(episodeDetailsObj));
    } catch (error) {
      console.log(error);
    }
  };
