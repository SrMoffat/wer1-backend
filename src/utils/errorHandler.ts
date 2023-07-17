import { GraphQLError } from "graphql";
import { GRAPHQL_TO_HTTP_ERROR_CODES } from "../constants";

export const formatError = (formattedError: GraphQLError) => {
    const graphQLErrorCode = formattedError.extensions.code;
    const commonErrorDetails = {
        ...formattedError,
        message: formattedError.message,
    };
    switch (graphQLErrorCode) {
        case "BAD_USER_INPUT":
            return {
                ...GRAPHQL_TO_HTTP_ERROR_CODES.BAD_USER_INPUT,
                ...commonErrorDetails,
            };
        case "GRAPHQL_PARSE_FAILED":
            return {
                ...GRAPHQL_TO_HTTP_ERROR_CODES.GRAPHQL_PARSE_FAILED,
                ...commonErrorDetails,
            };
        case "BAD_REQUEST":
            return {
                ...GRAPHQL_TO_HTTP_ERROR_CODES.BAD_REQUEST,
                ...commonErrorDetails,
            };
        case "INTERNAL_SERVER_ERROR":
            return {
                ...GRAPHQL_TO_HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR,
                ...commonErrorDetails,
            };
        default:
            return formattedError;
    }
};
