import { useMovies } from "../../context/MoviesContext";

const SearchBox = () => {
  const { updateSearch } = useMovies();

  return (
    <div className="relative search-container w-[31.2rem] h-[3rem] sm:mt-[2.6rem] sm:mb-[2.6rem] md:mt-[3.4rem] md:mb-[3.4rem] lg:mt-[6.5rem] lg:mb-[2.5rem]">
      <img
        src="/assets/icon-search.svg"
        className="icon-search w-[2.4rem] h-[2.4rem] absolute z-10   cursor-pointer left-0"
        alt="icon-search"
      />
      <input
        type="text"
        className="searchbox pl-[4.8rem] text-white placeholder:text-[#ffffff80] bg-[#10141e] focus:outline-none border-none font-light sm:text-[1.6rem] md:text-[2.4rem] lg:text-[2.4rem] sm:leading-[2rem] md:leading-[3rem] lg:leading-[3rem]   "
        placeholder="Search for movies or TV series"
        required
        onChange={(e) => updateSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
