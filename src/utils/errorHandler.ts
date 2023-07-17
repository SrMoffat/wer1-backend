import { GraphQLError } from "graphql";
import { GRAPHQL_TO_HTTP_ERROR_CODES } from "../constants";

export const formatError = (formattedError: GraphQLError) => {
    const graphQLErrorCode = formattedError.extensions.code;
    switch (graphQLErrorCode) {
        case "BAD_USER_INPUT":
            return {
                ...GRAPHQL_TO_HTTP_ERROR_CODES.BAD_USER_INPUT,
                ...formattedError,
                message: formattedError.message,
            };
        default:
            return formattedError;
    }
};
