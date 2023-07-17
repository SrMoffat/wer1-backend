export const signupMutation = `
    mutation signupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
        token
        user {
            id
            name
            email
        }
        }
    }
`;
export const loginMutation = `
    mutation loginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            id
            name
            email
        }
        }
    }
`;
export const fetchTracksQuery = `
    query fetchTracksQuery {
      fetchTracks {
        externalId
        title
        type
        length
        isrc
        creationDate
        productionDate
      }
    }
`;