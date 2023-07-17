import { createTestContext } from './__helpers';

import { SEED_USERS } from "../src/constants";
import { loginMutation, fetchTracksQuery } from './queries';

const candidateUser = SEED_USERS[0];

const ctx = createTestContext();
const authErrorMessage = "Invalid credentials";

it('fetchTracks errors without auth headers', async () => {
  const trackResults = await ctx.client.executeOperation({
    query: fetchTracksQuery
  });
  const hasErrors = trackResults.errors;
  expect(hasErrors).toBeTruthy();
  const errorMessage = hasErrors && hasErrors[0]?.message;
  expect(errorMessage).toContain(authErrorMessage);
});
it('fetchTracks returns with auth headers', async () => {
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
  const trackResults = await ctx.client.executeOperation(
    { query: fetchTracksQuery },
    // @ts-ignore
    { req: { headers: { authorization: `Bearer ${token}` } } }
  );
  const hasResults = trackResults.data;
  expect(hasResults).toBeTruthy();
  const trackResponse = hasResults && hasResults?.fetchTracks;
  expect(trackResponse).toBeInstanceOf(Array);
});
