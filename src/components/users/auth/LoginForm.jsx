import { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Formik } from "formik";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

import TextField from "./TextField";
import { useAuth } from "../../../context/AuthContext";
import { schemaLogin } from "./ValidationSchema";

const LoginForm = () => {
  const [errorM, setErrorM] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const cookies = useMemo(() => new Cookies(), []);
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";

  const handleSubmit = async (values, actions) => {
    actions.resetForm();
    const toastId = toast.loading("Logging in...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL || URL}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        setErrorCode(response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status !== "success") {
        throw new Error(data.message || "Login failed");
      }

      const decoded = jwt_decode(data.token);
      cookies.set("jwt_authorization", data.token, {
        expires: new Date(decoded.exp * 1000),
        secure: true,
        sameSite: "strict",
      });

      toast.dismiss(toastId);
      toast.success("Logged in successfully");

      setTimeout(() => {
        login(decoded);
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "An unexpected error occurred");
      setErrorM(error.message);
    }
  };

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
          initialValues={{ email: "test2@example.com", password: "123123" }}
          validationSchema={schemaLogin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <VStack
              as={Form}
              className="sm:w-[32.7rem] sm:h-[42rem] md:w-[40rem] md:h-[37.3rem] lg:w-[40rem] lg:h-[37.3rem]  bg-[#161d2f] rounded-[6px] p-[3.2rem]"
            >
              <Toaster position="top-center" />
              <Heading className="text-[3.2rem] font-light text-white mb-[4rem] self-start">
                Log In
              </Heading>
              <Text as="p" color={errorCode > 400 ? "#fc4747" : "#00FF00"}>
                {errorM}
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
                type="password"
              />
              <Button
                disabled={isSubmitting}
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
          )}
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
