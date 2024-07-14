import React, { useEffect } from "react";
import { asyncLoadMovie } from "../store/actions/movieActions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(asyncLoadMovie(id));
  }, []);
  return <div>MovieDetails</div>;
};

export default MovieDetails;
