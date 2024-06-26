import { NavLink, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { userData, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="flex navbar items-center sm:h-[5.6rem] sm:w-screen sm:rounded-none  md:h-[7.2rem]  lg:h-[96rem] lg:w-[9.6rem]  sm:flex-row  md:flex-row  lg:flex-col sm:justify-between md:justify-between  lg:justify-center  lg:absolute bg-[#161d2f] lg:top-[3.2rem] lg:left-[3.2rem] md:rounded-3xl lg:rounded-3xl lg:translate-x-0">
      <NavLink to="/">
        <img
          src="/assets/logo.svg"
          className="logo sm:ml-[1.6rem] md:ml-[2.4rem] lg:ml-0 lg:mb-[7.5rem]"
          alt="logo"
        />
      </NavLink>
      {isLoggedIn && (
        <>
          <ul className="nav lg:mb-[45rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4rem] flex sm:flex-row md:flex-row lg:flex-col items-center lg:pt-[3.5rem] sm:justify-center md:justify-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
                    fill="#5A698F"
                  />
                </svg>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                    fill="#5A698F"
                  />
                </svg>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tvseries"
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                    fill="#5A698F"
                  />
                </svg>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/bookmarked"
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <svg width="17" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
                    fill="#5A698F"
                  />
                </svg>
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <div className="avatar-wrap flex sm:flex-row md:flex-row lg:flex-col justify-center items-center gap-[2.4rem] ">
        {isLoggedIn ? (
          <div>
            <p className="text-[#5A698F] text-[1.3rem] text-light text-center ">
              {userData &&
                (userData.hasOwnProperty("name")
                  ? userData.name
                  : userData.email.split("@")[0])}
            </p>
            <button
              onClick={logout}
              className="text-[#5A698F] text-[1.3rem] text-light"
            >
              Log Out
            </button>
          </div>
        ) : (
          <NavLink to={path === "/login" ? "/register" : "/login"}>
            <p className="text-[#5A698F] text-[1.3rem] text-light">
              {path === "/login" ? "Sign Up" : "Sign In"}
            </p>
          </NavLink>
        )}
        <Toaster />
        {isLoggedIn ? (
          <NavLink to="/user" className="cursor-pointer">
            <img
              className="avatar w-[4rem] h-[4rem] sm:mr-[1.6rem] md:mr-[2.1rem] lg:mr-[0]"
              src={process.env.PUBLIC_URL + "/assets/user-avatar-def.png"}
              alt="avatar "
            />
          </NavLink>
        ) : (
          <div className="avatar w-[4rem] h-[4rem] sm:mr-[1.6rem] md:mr-[2.1rem] lg:mr-[0]"></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
