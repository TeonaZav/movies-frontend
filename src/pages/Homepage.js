import React, { useState, useEffect, useContext } from "react";
import MovieList from "../components/MovieList";
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/layout/Navbar";
import Trending from "../components/Trending";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/users/auth/AccountContext";
function Homepage({
  searchValue,
  setSearchValue,
  showModal,
  setShowModal,
  setUserBookmarks,
  setUserData,
  loading,
  setLoading,
}) {
  const [all, setAll] = useState([]);
  const [trending, setTrending] = useState([]);
  const { userBookmarks } = useContext(AuthContext);
  const URLM = "https://movies-backend-t.onrender.com/api/v1/movies";
  useEffect(() => {
    getSaved();
  }, [userBookmarks]);
  useEffect(() => {
    getTrending();
  }, [userBookmarks]);
  //------ GET ALL MOVIES FROM DATABASE ------//
  const getSaved = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MOVIES_URL || URLM}/all`
      );
      const data = await response.json();
      setAll((prevM) => {
        return data.data.map((movie) => {
          return { ...movie, movie };
        });
      });
      setLoading(false);
    } catch (err) {
      // console.error(err.message);
      console.log(err);
    }
  };

  //------ GET TRENDING MOVIES FROM DATABASE ------//
  const getTrending = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MOVIES_URL || URLM}/trending`
      );
      const data = await response.json();
      setTrending(() => {
        return data.data.map((movie) => {
          return { ...movie, movie };
        });
      });
    } catch (err) {
      // console.error(err.message);
      console.log(err);
    }
  };

  // //---------------------------------------------//
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="content-cont flex flex-col sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem]">
            <SearchBox
              data={all}
              setData={setAll}
              setSearchValue={setSearchValue}
            />
            <Trending
              data={all}
              trending={trending}
              setData={setAll}
              getTrending={getTrending}
              showModal={showModal}
              setShowModal={setShowModal}
              setUserData={setUserData}
              setUserBookmarks={setUserBookmarks}
              loading={loading}
              setLoading={setLoading}
            />
            <MovieListHeading
              heading={
                searchValue == ""
                  ? "Recommended for you"
                  : `Found ${
                      all.filter((movie) => {
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
                  data={all}
                  setData={setAll}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setUserBookmarks={setUserBookmarks}
                  setUserData={setUserData}
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
export default Homepage;
