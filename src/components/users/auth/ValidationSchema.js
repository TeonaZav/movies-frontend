const Yup = require("yup");
const schemaLogin = Yup.object({
  email: Yup.string().email("Invalid email format").required("Can't be empty"),
  password: Yup.string()
    .required("Can't be empty")
    .min(6, "Password too short!")
    .max(28, "Password too long!"),
});
const schemaSignup = Yup.object({
  email: Yup.string().email("Invalid email format").required("Can't be empty"),
  password: Yup.string()
    .required("Can't be empty")
    .min(6, "Password too short!")
    .max(28, "Password too long!"),
  passwordConfirm: Yup.string()
    .required("Can't be empty")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
module.exports = { schemaLogin, schemaSignup };
