import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

const AuthContext = createContext({
  loading: false,
  user: null,
  userData: null,
  userBookmarks: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState(null);

  const URL = "https://movies-backend-t.onrender.com/api/v1/users";

  const fetchAllUserData = async (userId) => {
    setLoading(true);
    try {
      const urls = [
        `${process.env.REACT_APP_USER_URL || URL}/${userId}`,
        `${process.env.REACT_APP_USER_URL || URL}/${userId}/bookmarked`,
      ];

      const [userDataResponse, bookmarksResponse] = await Promise.all(
        urls.map((url) => fetch(url))
      );

      if (!userDataResponse.ok) throw new Error("Failed to fetch user data.");
      if (!bookmarksResponse.ok) throw new Error("Failed to fetch bookmarks.");

      const userData = await userDataResponse.json();
      const bookmarksData = await bookmarksResponse.json();

      setUserData(userData.data.user);
      setUserBookmarks(bookmarksData.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback((authUser) => {
    setIsLoggedIn(true);
    setUser(authUser);
    fetchAllUserData(authUser.id);
  }, []);

  const logout = useCallback(() => {
    const toastId = toast.loading("Please wait...");
    setTimeout(() => {
      setUser(null);
      setUserData(null);
      cookies.remove("jwt_authorization");
      setIsLoggedIn(false);
      navigate("/");
      toast.dismiss(toastId);
    }, 2000);
  }, [navigate]);

  const handleBookmarkChange = (newBookmarks) => {
    setUserBookmarks(newBookmarks);
    fetchAllUserData(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        userData,
        isLoggedIn,
        login,
        logout,
        handleBookmarkChange,
        userBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
