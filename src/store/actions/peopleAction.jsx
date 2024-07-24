import axios from "../../utils/axios";
export { removePeople } from "../reducers/peopleSlice";
import { loadPeople } from "../reducers/peopleSlice";

export const asyncLoadPeople = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const external_ids = await axios.get(`/person/${id}/external_ids`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);

    let PeopleDetailsObj = {
      details: details.data,
      external_ids: external_ids.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    dispatch(loadPeople(PeopleDetailsObj));
  } catch (error) {
    console.log(error);
  }
};
