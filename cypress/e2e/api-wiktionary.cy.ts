import type { WikionaryReturnType } from '@/types/wiktionary';

// api/wiktionary/[word]/route.ts
describe('Wiktionary API', () => {
  it('should return full results for "example"', () => {
    responseHasResults('example');
    responseHasDialects('merry');
  });

  // Test the API with a word that has mergers
  it('should return full results for "merry"', () => {
    responseHasResults('merry');
    responseHasDialects('merry');
  });

  // Test the API with a less common word; dialects are not expected
  it('should return full results for "inquisitive"', () => {
    responseHasResults('inquisitive');
  });
});


function responseHasResults(word: string) {
  cy.request('/api/wiktionary/' + word).as('api');

  cy.get('@api')
    .its('body')
    .should((body: WikionaryReturnType) => {
      expect(body).to.have.property('word', word);
      expect(body).to.have.property('ipa');
      expect(body.ipa).to.not.be.null;
      expect(body.ipa).length.to.be.above(0);
      if (body.ipa) expect(body.ipa[0].pronunciations).length.to.be.above(0);
    });
}

function responseHasDialects(word: string) {
  cy.request('/api/wiktionary/' + word).as('api');

  cy.get('@api')
    .its('body')
    .should((body: WikionaryReturnType) => {
      expect(body.ipa).to.not.be.null;
      if (body.ipa) {
        expect(body.ipa).length.to.be.above(0);
        expect(body.ipa[0].dialects).length.to.be.above(0);
      }
    });
}
