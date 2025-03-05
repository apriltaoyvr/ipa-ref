describe('Word Info Card', () => {
  beforeEach(() => {
    cy.visit('/');
    searchWord('test');
  });

  it('should return Wiktionary data', () => {
    cy.get('[data-test="wiktionary-section"]', { timeout: 7500 })
      .as('wiktionary-section')
      .should('exist');

    // The section header should be visible
    cy.get('h3', { timeout: 7500 }).contains('Wiktionary').should('exist');

    // There should be a list of pronunciations
    // ul > li (all)
    cy.get('[data-test="wiktionary-results"]')
      .children()
      .as('pronunciations')
      .its('length')
      .should('be.above', 0);

    // The first pronunciation item for "test" should contain an IPA transcription and a dialect list 
    // li > span (ipa trans.) + span (dialects)
    cy.get('@pronunciations').first().as('first-ipa-entry');

    // Check if there is an IPA transcription
    cy.get('@first-ipa-entry').first().should('exist');

    // Check if there is a dialect list
    // NOTE: Not all words will return one but "test" should
    cy.get('@first-ipa-entry').last().should('exist');
  });

  it('should return Merriam-Webster data', () => {
    // There should be a definition list below the card's title
    cy.get('[data-test="word-definition"]', { timeout: 7500 })
      .children()
      .as('definitions')
      .its('length')
      .should('be.above', 0);

    // The first definition should exist
    cy.get('@definitions').first().should('exist');

    // There should be a Merriam-Webster section
    cy.get('[data-test="merriam-section"]')
      .as('merriam-section')
      .should('exist');

    // The section header should be visible
    cy.get('@merriam-section').find('h3').contains('Merriam-Webster').should('exist');

    // There should be a list of pronunciations
    // ul > li (all)
    cy.get('[data-test="merriam-results"]')
      .children()
      .as('pronunciations')
      .its('length')
      .should('be.above', 0);

    // The first pronunciation item should exist
    cy.get('@pronunciations').first().as('ipa-info').should('exist');
  });
});

function searchWord(word: string) {
  cy.get('form').within(($form) => {
    cy.get('input[name="word"]').type(word);
    cy.root().submit();
  });
}
