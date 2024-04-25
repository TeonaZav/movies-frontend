import { useAuth } from "../context/AuthContext";

import Container from "../components/UI/Container";
import MovieList from "../components/movies/MovieList";

function Bookmarked() {
  const { userData } = useAuth();

  if (!userData) return null;

  const bookmarks = userData?.bookmarks;

  const bookmarkedMovies = bookmarks.filter(
    (movie) => movie.category === "Movie"
  );

  const bookmarkedSeries = bookmarks.filter(
    (movie) => movie.category === "TV Series"
  );

  return (
    <Container>
      <MovieList data={bookmarkedMovies} title="Bookmarked Movies" />
      <MovieList data={bookmarkedSeries} title="Bookmarked TV Series" />
    </Container>
  );
}
export default Bookmarked;
