import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMovies } from "../../context/MoviesContext";

import MovieListHeading from "./MovieListHeading";
import TrendingItem from "./TrendingItem";

const Trending = ({ setLoading }) => {
  const { trending } = useMovies();

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: -0.5,
    speed: 1000,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1439,

        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <motion.div>
      <MovieListHeading propHeading="Trending" />
      <Slider
        {...settings}
        className="cursor-grab sm:mb-[2.4rem] md:mb-[3.9rem] lg:mb-[4rem]"
      >
        {trending.map((el) => {
          return <TrendingItem key={el._id} el={el} setLoading={setLoading} />;
        })}
      </Slider>
    </motion.div>
  );
};
export default Trending;
