import React, { useState, useEffect, useContext } from "react";
import MovieListHeading from "../components/MovieListHeading";
import Navbar from "../components/layout/Navbar";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";
import { AuthContext } from "../components/users/auth/AccountContext";
import { motion, AnimatePresence } from "framer-motion";
function Bookmarked({
  searchValue,
  setSearchValue,
  setUserBookmarks,
  setLoading,
}) {
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";
  const { user, userBookmarks, userData, loading } = useContext(AuthContext);
  const [bookmarked, setBookmarked] = useState([]);
  const [bookmarkedM, setBookmarkedM] = useState([]);
  const [bookmarkedS, setBookmarkedS] = useState([]);
  //------ GET Bookmarked FROM  DATABASE ------//
  useEffect(() => {
    const getSavedBookmars = async () => {
      if (user) {
        try {
          const userId = user.id;
          const response = await fetch(
            `${process.env.REACT_APP_USER_URL || URL}/${userId}`
          );
          const data = await response.json();
          const bookmarks = data.data.user.bookmarks;
          setBookmarked((prevM) => {
            return bookmarks.map((movie) => {
              return { ...movie, movie };
            });
          });
          setBookmarkedM(
            bookmarks.filter((movie) => movie.category === "Movie")
          );
          setBookmarkedS(
            bookmarks.filter((movie) => movie.category === "TV Series")
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    getSavedBookmars();
  }, [userData, userBookmarks, loading]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <div className="content-cont flex flex-col sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem]">
            <SearchBox
              data={bookmarked}
              setData={setBookmarked}
              setSearchValue={setSearchValue}
            />
            <MovieListHeading
              heading={
                searchValue == ""
                  ? "Bookmarked Movies"
                  : `Found ${
                      bookmarkedM.filter((movie) => {
                        return movie.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase());
                      }).length
                    } results for "${searchValue}"`
              }
            />
            <div className="movies-container sm:mb-[1.6rem] md:mb-[3.2rem] lg:mb-[4.8rem]">
              <div className="movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-y-[1.5rem] sm:gap-x-[1.6rem] md:gap-y-[2.4rem] md:gap-x-[2.9rem] lg:gap-y-[3.2rem] lg:gap-x-[4rem]">
                <MovieList
                  data={bookmarkedM}
                  setData={setBookmarkedM}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setUserBookmarks={setUserBookmarks}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <MovieListHeading
              heading={
                searchValue == ""
                  ? "Bookmarked TV Series"
                  : `Found ${
                      bookmarkedS.filter((movie) => {
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
                  data={bookmarkedS}
                  setData={setBookmarkedS}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
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
export default Bookmarked;
