import React, { useContext, useState } from "react";
import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Formik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import TextField from "./TextField";
import { AuthContext } from "./AccountContext";
import { schemaLogin } from "./ValidationSchema";
const LoginForm = () => {
  const [errorM, setErrorM] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const cookies = new Cookies();
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className="flex flex-col items-center justify-center min-h-screen w-screen"
      >
        <NavLink to="/" className="text-[1.5rem] text-[#fc4747]  ml-[0.8rem] ">
          <img
            className="w-[3.2rem] h-[2.6rem] sm:mb-[5.8rem]  md:mb-[7.2rem] lg:mb-[8.3rem] "
            src="assets/logo.svg"
            alt="logo"
          />
        </NavLink>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schemaLogin}
          onSubmit={(values, actions) => {
            const vals = { ...values };
            actions.resetForm();
            fetch(`${process.env.REACT_APP_USER_URL || URL}/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
              .catch((err) => {
                return;
              })
              .then((res) => {
                if (!res || !res.ok || res.status >= 400) {
                  setErrorCode(res.status);
                  setErrorM("Something wrong");
                  return;
                }
                return res.json();
              })
              .then((data) => {
                if (!data) return;
                if (data.status) {
                  setErrorCode(null);
                  if (data.status === "success") {
                    setErrorM("Logged In Successfully");
                  } else {
                    setErrorM(data.status);
                  }
                }
                if (data) {
                  if (data.status === "success") {
                    alert("Logged In Successfully");
                    window.setTimeout(() => {
                      navigate("/");
                    }, 2000);
                  }
                  const decoded = jwt_decode(data.token);
                  auth.login(decoded);
                  cookies.set("jwt_authorization", data.token, {
                    expires: new Date(decoded.expires),
                  });
                }
              });
          }}
        >
          <VStack
            as={Form}
            className="sm:w-[32.7rem] sm:h-[42rem] md:w-[40rem] md:h-[37.3rem] lg:w-[40rem] lg:h-[37.3rem]  bg-[#161d2f] rounded-[6px] p-[3.2rem]"
          >
            <Heading className="text-[3.2rem] font-light text-white mb-[4rem] self-start">
              Log In
            </Heading>
            <Text as="p" color={errorCode > 400 ? "#fc4747" : "#00FF00"}>
              {errorM}
              {console.log(auth.user, auth.isLoggedIn)}
            </Text>
            <TextField
              name="email"
              placeholder="Email address"
              autoComplete="off"
              label="email"
            />
            <TextField
              name="password"
              placeholder="Password"
              autoComplete="off"
              label="Password"
            />
            <Button
              colorScheme="teal"
              type="submit"
              className="w-full h-[4.8rem] text-white font-light bg-[#fc4747] hover:bg-[#ffffff] hover:text-[#10141e] focus:outline-none text-[1.5rem] rounded-[6px] text-center mb-[2.4rem]"
            >
              Log In
            </Button>

            <p className="text-[1.5rem] font-light text-white text-center">
              Don’t have an accoun?{" "}
              <NavLink
                to="/register"
                className="text-[1.5rem] text-[#fc4747] hover:underline ml-[0.8rem]"
              >
                Sign Up
              </NavLink>
            </p>
          </VStack>
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
