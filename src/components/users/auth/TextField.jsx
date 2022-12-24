import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error} className="relative">
      <Input
        as={Field}
        {...field}
        {...props}
        className={`bg-[#161d2f] sm:w-[29.5rem]  md:w-[36.8rem]  lg:w-[36.8rem] border-b-[0.1rem] border-[#5A698F] text-white font-light text-[1.5rem] focus:outline-none focus:border-[#FFFFFF] focus:placeholder-opacity-0 h-[3.7rem] p-[1.6rem] pt-0 caret-[#fc4747] form-control shadow-none ${
          meta.touched && meta.error && "is-invalid border-[#fc4747]"
        } mb-[2.4rem]`}
      />
      <FormErrorMessage className="error text-[1.3rem]  text-[#fc4747] font-light absolute right-[1.6rem] bottom-[4rem]">
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
