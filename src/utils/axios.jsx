import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODVhNWMwMzVlMGU5OWY4OGQ1NDU3MThjOWRlNTY4NiIsIm5iZiI6MTcyMDE4MzY4Mi45MTk2OTMsInN1YiI6IjY2ODdkMTM5MDBlNGE1N2M2NjA4MTEyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ozFcNG9Cnywze09JYlbdGzbBUBioc1EILRhxzVWZAHc",
  },
});

export default instance;
