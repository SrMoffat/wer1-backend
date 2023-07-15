// tests/Post.test.ts
import { createTestContext } from './__helpers';

const ctx = createTestContext();

const authErrorMessage = "Invalid credentials";

const fetchTracksQuery = `
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
it('fetchTracks errors without auth headers', async () => {
  const trackResults = await ctx.client.executeOperation({
    query: fetchTracksQuery
  });
  const hasErrors = trackResults.errors;
  const errorMessage = hasErrors && hasErrors[0]?.message;
  expect(hasErrors).toBeTruthy();
  expect(errorMessage).toContain(authErrorMessage);
});
