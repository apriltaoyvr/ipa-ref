import { IPAKey } from '@/components/ipa-key/ipa-key';

describe.skip('<IPAKey />', () => {
  it('should display <Sheet /> if the trigger is clicked', () => {
    openIPAKey();

    // The sheet should be visible
    cy.get('[data-slot="sheet-content"]').should(
      'have.attr',
      'data-state',
      'open',
    );
  });

  it('should have 3 <TabsTrigger />s containing: Consonants, Vowels, and Other', () => {
    openIPAKey();

    // The tabs should exist
    cy.get('[data-slot="tabs-list"]')
      .children()
      .as('tabs')
      .should('have.length', 3);

    cy.get('@tabs').eq(0).contains('Consonants');
    cy.get('@tabs').eq(1).contains('Vowels');
    cy.get('@tabs').eq(2).contains('Other');
  });

  it('should navigate between tables when the respective tab is clicked', () => {
    // Get tabs list and tabs content
    cy.get('[data-slot="tabs-list"]').children().as('tabs');
    cy.get('[data-slot="tabs-content"]').as('tabs-contents');

    // The consonant table should be visible by default
    cy.get('@tabs-contents').eq(0).should('have.attr', 'data-state', 'active');

    // Open vowels tab
    cy.get('@tabs').eq(1).contains('Vowels').click();
    cy.get('@tabs-contents').eq(1).should('have.attr', 'data-state', 'active');
    // Check if consonant table is hidden
    cy.get('@tabs-contents').eq(0).should('have.attr', 'data-state', 'hidden');

    // Open the the other tab
    cy.get('@tabs').eq(2).contains('Other').click();
    cy.get('@tabs-contents').eq(2).should('have.attr', 'data-state', 'active');
    // Check if vowel table is hidden
    cy.get('@tabs-contents').eq(0).should('have.attr', 'data-state', 'hidden');
  });

  it('should close the sheet if the close button is clicked', () => {
    // Click the close button
    cy.get('[data-slot="sheet-content"] > button.absolute').click();

    // The sheet should be closeds
    cy.get('[data-slot="sheet-content"]').should('not.exist');
  });
});

function openIPAKey() {
  cy.mount(<IPAKey />);
  cy.get('#ipa-key-trigger').click();
}
