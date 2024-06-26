import AddFavorites from "../AddFavorites";

const MovieListItem = ({ movie }) => {
  return (
    <li className="group hover:bg-blend-darken flex flex-col gap-2 relative group cursor-pointer">
      <AddFavorites item={movie} />
      <div className="group relative hover:bg-blend-darken group">
        <img
          className="poster  sm:w-[16.4rem]
sm:h-[11rem] md:w-[22rem]
md:h-[14rem] lg:w-[28rem]
lg:h-[17.4rem] rounded-[0.8rem] group-hover:mix-blend-overlay group-hover:scale-[1.05]"
          src={movie.thumbnail.regular.medium}
          alt="poster"
        />
        <div className="active:animate-ping flex flex-row items-center gap-[1.9rem] w-[11.7rem] h-[4.8rem] bg-[#ffffff41]  absolute left-1/2 top-2/4 -translate-y-2/4 -translate-x-2/4  pl-[0.9rem] rounded-[2.8rem] opacity-0 group-hover:opacity-100 ">
          <img src="assets/icon-play.svg" alt="icon-play " />
          <p className="text-3xl text-white font-light leading-9">Play</p>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 text-base font-light movie-features text-[#ffffffc0]">
        <span>{movie.year}</span> <span className="text-xs">○</span>
        <span className="flex items-center gap-2">
          <img
            className="w-5 h-5"
            src={`/assets/icon-nav-${
              movie.category === "Movie" ? "movies" : "tv-series"
            }.svg`}
            alt="category-icon"
          />
          {movie.category}
        </span>
        <span className="text-xs">○</span>
        <span>{movie.rating}</span>
      </div>
      <div className="text-lg text-white leading-loose tracking-wide">
        {movie.title}
      </div>
    </li>
  );
};

export default MovieListItem;
