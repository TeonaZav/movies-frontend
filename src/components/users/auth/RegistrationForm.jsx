import { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../../../context/AuthContext";
import TextField from "./TextField";

import { schemaSignup } from "./ValidationSchema";

const RegistrationForm = () => {
  const [errorM, setErrorM] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const cookies = useMemo(() => new Cookies(), []);
  const URL = "https://movies-backend-t.onrender.com/api/v1/users";
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (values, actions) => {
    actions.resetForm();
    const toastId = toast.loading("Signing up...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL || URL}/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok || response.status >= 400) {
        setErrorCode(response.status);
        setErrorM(data.message || "Something wrong");

        if (response.status === 500) {
          toast.error("Server error occurred. Please try again later.");
        }

        toast.error(`Error: ${data.message}`);
        return;
      }

      if (data.status === "success") {
        setErrorM("Account registered successfully");

        const decoded = jwt_decode(data.token);
        cookies.set("jwt_authorization", data.token, {
          path: "/",
          expires: new Date(decoded.expires),
          secure: true,
          sameSite: "strict",
        });

        toast.dismiss(toastId);
        toast.success("Account registered successfully");

        setTimeout(() => {
          login(decoded);
          navigate("/");
        }, 2000);
      } else {
        setErrorM(data.message || "Registration failed");
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.dismiss(toastId);
      setErrorM("An unexpected error occurred");
      console.error("Registration error:", err);
      toast.error(err.message || "Something wrong during registration");
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
        <Toaster position="top-center" />
        <NavLink to="/">
          <img
            className="w-[3.2rem] h-[2.6rem] sm:mb-[5.8rem]  md:mb-[7.2rem] lg:mb-[8.3rem] "
            src="assets/logo.svg"
            alt="logo"
          />
        </NavLink>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={schemaSignup}
          onSubmit={handleSubmit}
        >
          <VStack
            as={Form}
            className="sm:w-[32.7rem] sm:h-[42rem] md:w-[40rem] md:h-[41.8rem] lg:w-[40rem] lg:h-[41.8rem]  bg-[#161d2f] rounded-[6px] p-[3.2rem]"
          >
            <Heading className="text-[3.2rem] font-light text-white mb-[4rem] self-start">
              Sign Up
            </Heading>
            <Text as="p" color={errorCode > 400 ? "#fc4747" : "#00FF00"}>
              {errorM}
            </Text>
            <TextField
              name="email"
              placeholder="Email address"
              autoComplete="off"
            />
            <TextField
              name="password"
              placeholder="Password"
              autoComplete="off"
              type="password"
            />
            <TextField
              name="passwordConfirm"
              placeholder="Repeat password"
              autoComplete="off"
              type="password"
            />
            <Button
              colorScheme="teal"
              type="submit"
              className="w-full h-[4.8rem] text-white font-light bg-[#fc4747] hover:bg-[#ffffff] hover:text-[#10141e] focus:outline-none text-[1.5rem] rounded-[6px] text-center mb-[2.4rem]"
            >
              Sign Up
            </Button>

            <p className="text-[1.5rem] font-light text-white text-center">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[1.5rem] text-[#fc4747] hover:underline ml-[0.8rem]"
              >
                Log In
              </NavLink>
            </p>
          </VStack>
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegistrationForm;

// (values, actions) => {
//   const vals = { ...values };
//   actions.resetForm();
//   fetch(`${process.env.REACT_APP_USER_URL || URL}/register`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(vals),
//   })
//     .catch((err) => {
//       return;
//     })
//     .then((res) => {
//       if (!res || !res.ok || res.status >= 400) {
//         setErrorCode(res.status);
//         setErrorM("Something wrong");
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       if (!data) return;
//       if (data.status) {
//         setErrorCode(null);
//         if (data.status === "success") {
//           setErrorM("Account registered successfully");
//         } else {
//           setErrorM(data.status);
//         }
//       }
//       if (data) {
//         if (data.status === "success") {
//           alert("Logged In Successfully");
//           window.setTimeout(() => {
//             navigate("/");
//           }, 2000);
//         }
//         const decoded = jwt_decode(data.token);
//         login(decoded);
//         cookies.set("jwt_authorization", data.token, {
//           expires: new Date(decoded.expires),
//         });
//       }
//     });
// }
