import { GraphQLError } from "graphql";

export const formatError = (formattedError: GraphQLError) => {
    console.log("===>", formattedError.extensions)
    return {
        message: "Error"
    }
    // Return a different error message
    // if (
    //     formattedError.extensions.code ===
    //     ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    //   ) {
    //     return {
    //       ...formattedError,
    //       message: "Your query doesn't match the schema. Try double-checking it!",
    //     };
    //   }

    //   // Otherwise return the formatted error. This error can also
    //   // be manipulated in other ways, as long as it's returned.
    //   return formattedError;
};