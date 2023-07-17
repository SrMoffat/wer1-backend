// Nullable checks are redundant due to GraphQL SDL type checking and Nexus generated types
// Even so validation redundancy is not a bad idea
import * as yup from "yup";

const commonAuthFields = {
    name: yup.string()
        .required("Name is a required field.")
        .min(2, "Name must be more than 2 characters."),
    email: yup.string()
        .required("Email is a required field.")
        .email("Invalid email provided."),
};

const userSignUpSchema = yup.object({
   ...commonAuthFields,
    password: yup.string()
        .required("Password is a required field")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
});
const userLoginSchema = yup.object({
   ...commonAuthFields
});

export {
    userSignUpSchema,
    userLoginSchema
}
