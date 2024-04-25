import { useEffect, useMemo, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navigate } from "react-router";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence } from "framer-motion";
import { PrivateRoutes } from "./users/auth/PrivateRoutes";

import { useAuth } from "../context/AuthContext";
import MotionRoute from "./UI/MotionRoute";
import Navbar from "./UI/Navbar";
import LoadingImage from "./../assets/loading.gif";

const Homepage = lazy(() => import("../pages/Homepage"));
const Movies = lazy(() => import("../pages/Movies"));
const TvSeries = lazy(() => import("../pages/TvSeries"));
const Bookmarked = lazy(() => import("../pages/Bookmarked"));
const UserItem = lazy(() => import("./users/UserItem"));
const LoginForm = lazy(() => import("./users/auth/LoginForm"));
const RegistrationForm = lazy(() => import("./users/auth/RegistrationForm"));

function AnimatedRoutes() {
  const location = useLocation();
  const cookies = useMemo(() => new Cookies(), []);

  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    const userToken = cookies.get("jwt_authorization");
    if (userToken) {
      try {
        const decoded = jwt_decode(userToken);
        login(decoded);
      } catch (error) {
        console.log("Token decode failed:", error);
      }
    }
  }, [login]);

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <>
            <img
              className="loading-img w-[20rem] mt-[3.2rem]"
              src={LoadingImage}
              alt="loading icon"
            />
          </>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/movies"
                element={
                  <MotionRoute animationKey="movies">
                    <Movies />
                  </MotionRoute>
                }
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/tvseries"
                element={
                  <MotionRoute animationKey="tvseries">
                    <TvSeries />
                  </MotionRoute>
                }
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/bookmarked"
                element={
                  <MotionRoute animationKey="bookmarked">
                    <Bookmarked />
                  </MotionRoute>
                }
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/"
                element={
                  <MotionRoute animationKey="home">
                    <Homepage />
                  </MotionRoute>
                }
              ></Route>
            </Route>
            <Route
              path="/user"
              element={isLoggedIn ? <UserItem /> : <Navigate to="/" replace />}
            />

            <Route
              index
              path="/login"
              element={
                !isLoggedIn ? <LoginForm /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/register"
              element={
                !isLoggedIn ? <RegistrationForm /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
export default AnimatedRoutes;
