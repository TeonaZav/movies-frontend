import { createContext } from "react";

export const AuthContext = createContext({
  loading: false,
  user: null,
  userData: null,
  userBookmarks: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
