import React from "react";
import AddFavorites from "../AddFavorites";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

function Modal() {
  const { modalIsOpen, closeModal } = useModal();
  return (
    <div>
      <AddFavorites />
      {modalIsOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-sm relative flex flex-col w-full bg-[#161D2F] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-[#b8c9f5] border-opacity-10 rounded-t">
                  <p className="text-3xl  text-white font-thin ">
                    Log in to your account
                  </p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-[#b8c9f5] opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-white text-[1.3rem] font-light leading-relaxed">
                    Just sign in to your account to access bookmarks
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-[#b8c9f5] border-opacity-10 rounded-b">
                  <button
                    className="text-[#b8c9f5] background-transparent   px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-wider"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <NavLink to="/login">
                    <button
                      className="bg-[#FC4747] text-white tracking-wide active:bg-[#FC4747] text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={closeModal}
                    >
                      Log in
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-5 fixed inset-0 z-40 bg-[#161D2F]"></div>
        </>
      ) : null}
    </div>
  );
}
export default Modal;
