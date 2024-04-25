import { useLocation } from "react-router-dom";
import { useMovies } from "../../context/MoviesContext.js";

const MovieListHeading = ({ propHeading, itemsLength }) => {
  const location = useLocation();
  const { searchValue } = useMovies();

  const heading = !propHeading
    ? location.pathname === "/movies"
      ? "Movies"
      : location.pathname === "/tvseries"
      ? "Tv Series"
      : location.pathname === "/bookmarked"
      ? "Bookmarked Movies"
      : "Recommended for you"
    : propHeading;

  return (
    <div>
      <h1 className="font-light sm:text-[2rem] md:text-[3.2rem] lg:text-[3.2rem] text-white sm:mb-[1.6rem] md:mb-[2.5rem] lg:mb-[2.5rem]">
        {!searchValue
          ? heading
          : `Found ${itemsLength} results for "${searchValue}"`}
      </h1>
    </div>
  );
};

export default MovieListHeading;


