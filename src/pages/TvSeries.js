import React, { useState, useEffect, useContext } from "react";
import MovieListHeading from "../components/MovieListHeading";
import Navbar from "../components/layout/Navbar";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/users/auth/AccountContext";
function TvSeries({
  searchValue,
  setSearchValue,
  showModal,
  setShowModal,
  setUserData,
  setUserBookmarks,
  loading,
  setLoading,
}) {
  const { userBookmarks, userData } = useContext(AuthContext);
  const [series, setSeries] = useState([]);
  const URLM = "https://movies-backend-t.onrender.com/api/v1/movies";
  useEffect(() => {
    getTvseries();
  }, []);
  //------ GET TV SERIES FROM DATABASE ------//
  const getTvseries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MOVIES_URL || URLM}/tvshows`
      );
      const data = await response.json();
      setSeries((prevM) => {
        return data.data.map((movie) => {
          return { ...movie, movie };
        });
      });
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <div className="content-cont flex flex-col sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem]">
            <SearchBox
              data={series}
              setData={setSeries}
              setSearchValue={setSearchValue}
            />
            <MovieListHeading
              heading={
                searchValue == ""
                  ? "Tv Series"
                  : `Found ${
                      series.filter((movie) => {
                        return movie.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase());
                      }).length
                    } results for "${searchValue}"`
              }
            />
            <div className="movies-container ">
              <div className="movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-y-[1.5rem] sm:gap-x-[1.6rem] md:gap-y-[2.4rem] md:gap-x-[2.9rem] lg:gap-y-[3.2rem] lg:gap-x-[4rem]">
                <MovieList
                  data={series}
                  setData={setSeries}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  userData={userData}
                  setUserData={setUserData}
                  userBookmarks={userBookmarks}
                  setUserBookmarks={setUserBookmarks}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default TvSeries;
