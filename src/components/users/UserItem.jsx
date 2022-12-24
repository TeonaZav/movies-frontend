import React, { useState, useContext } from "react";
import { AuthContext } from "./auth/AccountContext";
import Navbar from "../layout/Navbar";
const UserItem = () => {
  const { user, userData } = useContext(AuthContext);
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";
  //--------- update user --------//
  const [name, setName] = useState("");
  const inputHandler = (e) => {
    setName(e.target.value);
  };
  const updateHandler = async () => {
    const vals = name;
    const userId = user.id;
    await fetch(`${process.env.REACT_APP_USER_URL || URL}/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: vals }),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data) {
          if (data.status === "success") {
            alert("Updated Successfully");
          }
        }
      });
  };

  return (
    <section className="lg:pt-[6.4rem] bg-opacity-50 h-screen w-[100vw] flex flex-col  items-center">
      <Navbar />
      {user && (
        <div className="mx-auto container sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem] max-h-[140rem] md:w-3/4 shadow-md ">
          <div className="p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src={process.env.PUBLIC_URL + "/assets/user-avatar-def.png"}
                />

                <h1 className="text-gray-600">
                  {userData &&
                    (userData.hasOwnProperty("name")
                      ? userData.name
                      : userData.email.split("@")[0])}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-[#c6d5fc] space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">Email</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
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
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
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
                  <svg
                    fill="none"
                    className="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
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
