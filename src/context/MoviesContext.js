import React, { createContext, useState, useContext } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [all, setAll] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchedValue] = useState("");

  const URLM = "https://movies-backend-t.onrender.com/api/v1/movies";

  const updateSearch = (value) => {
    setSearchedValue(value);
  };

  const getSaved = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIES_URL || URLM}/all`
    );
    const data = await response.json();
    return data.data;
  };

  const getTrending = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIES_URL || URLM}/trending`
    );
    const data = await response.json();
    return data.data;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [saved, trending] = await Promise.all([getSaved(), getTrending()]);
      setAll(saved);
      setTrending(trending);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MOVIES_URL || URLM}/movies`
      );
      const data = await response.json();
      setMovies(data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedSeries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MOVIES_URL || URLM}/tvshows`
      );
      const data = await response.json();
      setSeries(data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        all,
        trending,
        movies,
        series,
        fetchData,
        fetchSavedMovies,
        fetchSavedSeries,
        loading,
        searchValue,
        updateSearch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
