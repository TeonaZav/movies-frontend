import { useModal } from "../context/ModalContext";
import { useAuth } from "./../context/AuthContext";

const AddFavorites = ({ item }) => {
  const { user, isLoggedIn, loading, userBookmarks, handleBookmarkChange } =
    useAuth();

  const URL = "https://movies-backend-t.onrender.com/api/v1/users";

  const { openModal } = useModal();

  const bookmarkHandler = async (id) => {
    if (!userBookmarks) return null;
    let newBookmarks;
    if (userBookmarks.includes(id)) {
      newBookmarks = userBookmarks.filter((el) => el !== id);
    } else {
      newBookmarks = [...userBookmarks, id];
    }

    try {
      const body = { bookmarks: newBookmarks };
      const userId = user.id;
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL || URL}/${userId}/bookmarked`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update bookmarks");
      }
      handleBookmarkChange(newBookmarks);
      console.log("Bookmarks updated successfully");
    } catch (err) {
      console.error("Error updating bookmarks:", err.message);
    }
  };

  if (item) {
    return (
      <div>
        {item && (
          <div
            className="absolute w-14 h-14 rounded-full bg-opacity-50 bg-black top-6 right-6 cursor-pointer flex justify-center items-center z-30"
            onClick={() => (isLoggedIn ? bookmarkHandler(item._id) : openModal)}
          >
            {isLoggedIn &&
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
