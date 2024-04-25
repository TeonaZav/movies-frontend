import React from "react";
import { motion } from "framer-motion";
import AddFavorites from "../AddFavorites";

const TrendingItem = ({
  el,
  setLoading,
}) => {
  return (
    <motion.div className="inline-block sm:max-w-[23.5rem] sm:-h-[14rem] md:max-w-[47rem] md:h-[23rem] lg:max-w-[45rem] lg:h-[23rem] relative z-40">
      <AddFavorites
        item={el}
        setLoading={setLoading}
      />
      <img
        className="rounded-[0.8rem] w-full h-full pointer-events-none max-h-[24rem]"
        src={el.thumbnail.regular.large}
        alt="poster"
      />
      <div className="flex flex-row items-center gap-[1.9rem] w-[11.7rem] h-[4.8rem] bg-[#ffffff41]  absolute left-1/2 top-2/4 -translate-y-2/4 -translate-x-2/4 cursor-pointer pl-[0.9rem] rounded-[2.8rem] opacity-0 hover:opacity-100">
        <img src="assets/icon-play.svg" alt="icon-play " />
        <p className="text-3xl text-white font-light leading-9">Play</p>
      </div>
      <div className="absolute sm:bottom-[1.6rem] sm:left-[1.6rem] md:bottom-[2.4rem] md:left-[2.4rem] lg:bottom-[2.4rem] lg:left-[2.4rem]">
        <div className="flex justify-start items-center gap-2 sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.5rem] font-light movie-features text-[#ffffffc0] ">
          <span>{el.year}</span> <span className="text-xs">○</span>
          <span className="flex items-center gap-2">
            <img
              className="w-5 h-5"
              src={`/assets/icon-nav-${
                el.category === "Movie" ? "movies" : "tv-series"
              }.svg`}
              alt="category-icon"
            />
            {el.category}
          </span>
          <span className="text-xs">○</span>
          <span>{el.rating}</span>
        </div>
        <div className="sm:text-[1.5rem] md:text-[2.4rem] lg:text-[2.4rem] text-white leading-loose tracking-wide">
          {el.title}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingItem;
