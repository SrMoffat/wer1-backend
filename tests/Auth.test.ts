import { faker } from "@faker-js/faker";
import { createTestContext } from "./__helpers";

import { loginMutation, signupMutation } from "./queries";
import { SEED_USERS, AUTH_VALIDATION_ERRORS, INVALID_AUTH_ERROR } from "../src/constants";

const candidateUser = SEED_USERS[0];
const duplicateEmailError = "Unique constraint failed on the fields: (`email`)";

const ctx = createTestContext();

it("signupMutation errors when user submits weak password", async () => {
    // Test assumes seed script (src/seed.ts) was run during setup
    const userDetails = {
        name: candidateUser.name,
        email: candidateUser.email,
        password: "weak",
    };
    const signupResults = await ctx.client.executeOperation({
        query: signupMutation,
        variables: userDetails
    });
    const hasErrors = signupResults.errors;
    expect(hasErrors).toBeTruthy();
    const errorMessage = hasErrors && hasErrors[0]?.message;
    expect(errorMessage).toContain(AUTH_VALIDATION_ERRORS.password.invalid);
});
it("signupMutation errors when user submits invalid email", async () => {
    // Test assumes seed script (src/seed.ts) was run during setup
    const userDetails = {
        email: "invalidemail",
        password: "12345678Qq!",
        name: faker.internet.userName()
    };
    const signupResults = await ctx.client.executeOperation({
        query: signupMutation,
        variables: userDetails
    });
    const hasErrors = signupResults.errors;
    expect(hasErrors).toBeTruthy();
    const errorMessage = hasErrors && hasErrors[0]?.message;
    expect(errorMessage).toContain(AUTH_VALIDATION_ERRORS.email.invalid);
});
it("signupMutation errors when user already exists", async () => {
    // Test assumes seed script (src/seed.ts) was run
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
it("signupMutation returns credentials", async () => {
    // Test needs to cleanup DB after run
    const userDetails = {
        email: faker.internet.email(),
        password: "12345678Qq!",
        name: faker.internet.userName()
    };
    const signupResults = await ctx.client.executeOperation({
        query: signupMutation,
        variables: userDetails
    });
    const hasData = signupResults.data;
    expect(hasData).toBeTruthy();
    const response = hasData && hasData?.signup;
    const token = response.token;
    expect(token).toBeTruthy();
    const user = response.user;
    expect(user.email).toBe(userDetails.email);
    expect(user.name).toBe(userDetails.name);
});
it("loginMutation errors when user does not exists", async () => {
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
    expect(errorMessage).toContain(INVALID_AUTH_ERROR);
});
it("loginMutation returns credentials", async () => {
    // Test assumes seed script (src/seed.ts) was run
    const userDetails = {
        email: candidateUser.email,
        password: candidateUser.password,
    };
    const loginResults = await ctx.client.executeOperation({
        query: loginMutation,
        variables: userDetails
    });
    const hasData = loginResults.data;
    expect(hasData).toBeTruthy();
    const response = hasData && hasData?.login;
    const token = response.token;
    expect(token).toBeTruthy();
    const user = response.user;
    expect(user.email).toBe(userDetails.email);
});

