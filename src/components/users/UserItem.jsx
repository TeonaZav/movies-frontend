import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as EmailIcon } from "./../../assets/email-icon.svg";
import { ReactComponent as ReloadIcon } from "./../../assets/refresh-icon.svg";
import { ReactComponent as UserIcon } from "./../../assets/user-icon.svg";

const UserItem = () => {
  const { user, userData } = useAuth();
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";

  const [name, setName] = useState("");
  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const updateHandler = async () => {
    const userId = user.id;
    const updateUrl = `${process.env.REACT_APP_USER_URL || URL}/${userId}`;
    try {
      const response = await fetch(updateUrl, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.status === "success") {
        alert("Updated Successfully");
      } else {
        throw new Error("Update failed!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.message);
    }
  };

  return (
    <section className="lg:pt-[6.4rem] bg-opacity-50 h-screen w-[100vw] flex flex-col items-center mt-12">
      {user && (
        <div className="mx-auto container sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem] max-h-[140rem] md:w-3/4 shadow-md ">
          <div className="bg-[#c6d5fc] space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">Email</label>
                <div className="w-full inline-flex border">
                  <EmailIcon className="w-6 text-gray-400 mx-auto" />

                  <input
                    type="email"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={userData && userData.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <div className="w-full inline-flex border">
                    <UserIcon className="w-6 text-gray-400 mx-auto" />
                    <input
                      type="text"
                      onChange={inputHandler}
                      value={name}
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder={
                        userData &&
                        (userData.hasOwnProperty("name")
                          ? userData.name
                          : userData.email.split("@")[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
              <div className="md:w-3/12 text-center md:pl-6">
                <button
                  className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                  onClick={updateHandler}
                >
                  <ReloadIcon className="w-4 text-white mr-2" />
                  Update
                </button>
              </div>
            </div>

            <hr />
            <div className="w-full p-4 text-right text-gray-500"></div>
          </div>
        </div>
      )}
    </section>
  );
};
export default UserItem;
