import React, { useContext } from "react";
import { AuthContext } from "./users/auth/AccountContext";
const AddFavorites = ({ item, setShowModal, setLoading }) => {
  const { user, userBookmarks, loading } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";
  //--------- bookmarks --------//
  const bookmarkHandler = async (id) => {
    setLoading(true);
    if (userBookmarks) {
      if (userBookmarks.includes(id)) {
        const index = userBookmarks.indexOf(id);
        userBookmarks.splice(index, 1);
      } else {
        userBookmarks.push(id);
      }
      try {
        const body = { bookmarks: userBookmarks };
        const userId = user.id;
        await fetch(
          `${process.env.REACT_APP_USER_URL || URL}/${userId}/bookmarked`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      return null;
    }
  };

  if (item) {
    return (
      <div>
        {item && (
          <div
            className="absolute w-14 h-14 rounded-full bg-opacity-50 bg-black top-6 right-6 cursor-pointer flex justify-center items-center z-30"
            onClick={() =>
              auth.isLoggedIn ? bookmarkHandler(item._id) : setShowModal(true)
            }
          >
            {auth.isLoggedIn &&
            userBookmarks &&
            loading === false &&
            userBookmarks.includes(item._id) ? (
              <img src={`/assets/icon-bookmark-full.svg`} alt="" />
            ) : (
              <img src="/assets/icon-bookmark-empty.svg" alt="" />
            )}
          </div>
        )}
      </div>
    );
  }
};
export default AddFavorites;
