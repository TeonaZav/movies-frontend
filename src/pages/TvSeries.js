import { useEffect } from "react";

import { useMovies } from "../context/MoviesContext";
import Container from "../components/UI/Container";
import MovieList from "../components/movies/MovieList";

function TvSeries() {
  const { series, fetchSavedSeries } = useMovies();

  useEffect(() => {
    fetchSavedSeries();
  }, []);

  return (
    <Container>
      <MovieList data={series} />
    </Container>
  );
}
export default TvSeries;
