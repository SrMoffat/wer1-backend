// tests/Post.test.ts
import { createTestContext } from './__helpers';

const ctx = createTestContext();

it('fetchTracks errors without auth headers', async () => {
  const trackResults = await ctx.client.request(`
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
  `);
  console.log("Testing fetchTracks", trackResults);
  expect(trackResults).toThrow()
  // Snapshot that draft and expect `published` to be false
  // expect(draftResult).toMatchInlineSnapshot()              // 3
  // // Publish the previously created draft
  // const publishResult = await ctx.client.request(`
  //   mutation publishDraft($draftId: Int!) {
  //     publish(draftId: $draftId) {
  //       id
  //       title
  //       body
  //       published
  //     }
  //   }
  // `,
  //   { draftId: draftResult.createDraft.id }
  // )
  // Snapshot the published draft and expect `published` to be true
  // expect(publishResult).toMatchInlineSnapshot()
});
