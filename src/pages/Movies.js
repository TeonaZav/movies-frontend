import { useEffect } from "react";

import { useMovies } from "../context/MoviesContext";
import Container from "../components/UI/Container";

import MovieList from "../components/movies/MovieList";

function Movies() {
  const { movies, fetchSavedMovies } = useMovies();

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  return (
    <Container>
      <MovieList data={movies} />
    </Container>
  );
}
export default Movies;
