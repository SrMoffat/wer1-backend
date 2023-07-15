// tests/Post.test.ts
import { faker } from "@faker-js/faker";
import { createTestContext } from "./__helpers";

import { SEED_USERS } from "../src/constants";

const candidateUser = SEED_USERS[0];

const duplicateEmailError = "Unique constraint failed on the fields: (`email`)";
const invalidAuthError = "Invalid credentials";


const ctx = createTestContext();
const signupMutation = `
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
const loginMutation = `
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
it('signupMutation errors when user already exists', async () => {
    // Test assumed seed script (src/seed.ts) was run
    const userDetails = {
        name: candidateUser.name,
        email: candidateUser.email,
        password: candidateUser.password,
    };
    const signupResults = await ctx.client.executeOperation({
        query: signupMutation,
        variables: userDetails
    });
    const hasErrors = signupResults.errors;
    expect(hasErrors).toBeTruthy();
    const errorMessage = hasErrors && hasErrors[0]?.message;
    expect(errorMessage).toContain(duplicateEmailError);
});
it('signupMutation returns credentials', async () => {
    // Test needs to cleanup DB after run
    const userDetails = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.internet.userName()
    };
    const signupResults = await ctx.client.executeOperation({
        query: signupMutation,
        variables: userDetails
    });
    const hasData = signupResults.data;
    const response = hasData && hasData?.signup;
    const token = response.token;
    const user = response.user;
    expect(hasData).toBeTruthy();
    expect(token).toBeTruthy();
    expect(user.email).toBe(userDetails.email);
    expect(user.name).toBe(userDetails.name);
});
it('loginMutation returns user details', async () => {
    const userDetails = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    const loginResults = await ctx.client.executeOperation({
        query: loginMutation,
        variables: userDetails
    });
    const hasErrors = loginResults.errors;
    expect(hasErrors).toBeTruthy();
    const errorMessage = hasErrors && hasErrors[0]?.message;
    expect(errorMessage).toContain(invalidAuthError);
});

