import { useEffect } from "react";

import { useMovies } from "../context/MoviesContext";
import Container from "../components/UI/Container";
import MovieList from "../components/movies/MovieList";
import Trending from "../components/movies/Trending";

function Homepage() {
  const { all, fetchData } = useMovies();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Trending />
      <MovieList data={all} />
    </Container>
  );
}
export default Homepage;
