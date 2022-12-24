const MovieListHeading = ({ heading }) => {
  return (
    <div>
      <h1 className="font-light sm:text-[2rem] md:text-[3.2rem] lg:text-[3.2rem] text-white sm:mb-[1.6rem] md:mb-[2.5rem] lg:mb-[2.5rem]">
        {heading}
      </h1>
    </div>
  );
};

export default MovieListHeading;
