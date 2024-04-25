import { useMovies } from "../../context/MoviesContext";
import Modal from "../UI/Modal";
import MovieListItem from "./MovieListItem";
import MovieListHeading from "./MovieListHeading";

const MovieList = ({ data, title = "" }) => {
  const { searchValue } = useMovies();

  const filteredMovies = data?.filter((movie) =>
    searchValue
      ? movie.title.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  return (
    <>
      <MovieListHeading itemsLength={filteredMovies.length} propHeading={title}/>
      <ul className="movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-y-[1.5rem] sm:gap-x-[1.6rem] md:gap-y-[2.4rem] md:gap-x-[2.9rem] lg:gap-y-[3.2rem] lg:gap-x-[4rem]">
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <MovieListItem key={movie._id} movie={movie} />
          ))}
      </ul>
      <Modal />
    </>
  );
};

export default MovieList;
