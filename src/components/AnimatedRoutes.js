import React, { useEffect, useState, useContext, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import Homepage from "../pages/Homepage";
import Movies from "../pages/Movies";
import TvSeries from "../pages/TvSeries";
import Bookmarked from "../pages/Bookmarked";
import UserItem from "./users/UserItem";
import LoginForm from "./users/auth/LoginForm";
import RegistrationForm from "./users/auth/RegistrationForm";
import { PrivateRoutes } from "./users/auth/PrivateRoutes";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "./users/auth/AccountContext";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";
  const login = useCallback((u) => {
    setIsLoggedIn(true);
    setUser(u);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    cookies.remove("jwt_authorization");
    navigate("/");
    setIsLoggedIn(false);
  }, []);
  useEffect(() => {
    const userToken = cookies.get("jwt_authorization");
    if (userToken) {
      const decoded = jwt_decode(userToken);
      login(decoded);
    }
  }, []);

  const getSavedBookmarks = async () => {
    if (user) {
      try {
        const userId = user.id;
        const response = await fetch(
          `${process.env.REACT_APP_USER_URL || URL}/${userId}/bookmarked`
        );
        const data = await response.json();
        return setUserBookmarks(data.data);
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  useEffect(() => {
    getSavedBookmarks();
  }, [user]);

  useEffect(() => {
    getUserData();
  }, [userBookmarks]);
  const getUserData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userId = user.id;
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL || URL}/${userId}`
      );
      const data = await response.json();
      const userinfo = data.data.user;
      setUserData(userinfo);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        user: user,
        userData: userData,
        userBookmarks: userBookmarks,
        loading: loading,
      }}
    >
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            exact={true}
            element={
              <Homepage
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                showModal={showModal}
                setShowModal={setShowModal}
                setUserBookmarks={setUserBookmarks}
                loading={loading}
                setLoading={setLoading}
              ></Homepage>
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                showModal={showModal}
                setShowModal={setShowModal}
                setUserBookmarks={setUserBookmarks}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/tvseries"
            element={
              <TvSeries
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                showModal={showModal}
                setShowModal={setShowModal}
                setUserBookmarks={setUserBookmarks}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/bookmarked"
              element={
                <Bookmarked
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setUserBookmarks={setUserBookmarks}
                  setUserData={setUserData}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            ></Route>
          </Route>

          <Route
            path="/user"
            element={isLoggedIn ? <UserItem /> : <Navigate to="/" replace />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginForm /> : <Navigate to="/" replace />}
            setUser={user}
            userData={userData}
            setUserData={setUserData}
          />
          <Route
            path="/register"
            element={
              !isLoggedIn ? <RegistrationForm /> : <Navigate to="/" replace />
            }
            setUser={user}
            userData={userData}
            setUserData={setUserData}
          />
        </Routes>
      </AnimatePresence>
    </AuthContext.Provider>
  );
}
export default AnimatedRoutes;
