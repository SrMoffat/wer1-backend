// Nullable checks are redundant due to GraphQL SDL type checking and Nexus generated types
// Even so validation redundancy is not a bad idea
import * as yup from "yup";

import { AUTH_VALIDATION_ERRORS, PASSWORD_REGEX } from "../constants";

const { name, email, password } = AUTH_VALIDATION_ERRORS;

const commonAuthFields = {
    name: yup.string()
        .required(name.required)
        .min(2, name.invalid),
    email: yup.string()
        .required(email.required)
        .email(email.invalid),
};
const userSignUpSchema = yup.object({
    ...commonAuthFields,
    password: yup.string()
        .required(password.required)
        .matches(
            PASSWORD_REGEX,
            password.invalid
        ),
});
export {
    userSignUpSchema
};
