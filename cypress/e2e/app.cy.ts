// Routing
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the home page and its essential information', () => {
    cy.get('h1').contains('IPA Reference');

    // The word search form should exist
    cy.get('form').should('exist');
    cy.get('input').should('exist');

    // The word card in its default state should exist
    cy.get('[data-slot="card"]').should('exist');
    cy.get('[data-test="wiktionary-section"] > h3').contains('Wiktionary');
    cy.get('[data-test="merriam-section"] > h3').contains('Merriam-Webster');
  });

  it('should navigate to the about page', () => {
    cy.get('a[href*="about"]').click();

    cy.url().should('include', '/about', { timeout: 5000 });
    cy.get('h1').contains('About this site');
  });
});

describe('Theme Toggle', () => {
  it('changes the site theme on select', () => {
    cy.visit('/');
    cy.get('[data-test="theme-toggle-trigger"]').as('trigger').should('exist').click();

    // The dropdown elements should be visible and should have the appropriate states
    cy.get('@trigger').should('have.attr', 'data-state', 'open');
    cy.get("[data-test='dark-selector']")
      .contains('Dark')
      .as('dark-selector')
      .should('exist');
    cy.get("[data-test='light-selector']")
      .contains('Light')
      .as('light-selector')
      .should('exist');
    cy.get("[data-test='system-selector']")
      .contains('System')
      .as('system-selector')
      .should('exist');

    // Should change the theme to dark
    cy.get('@dark-selector').click();
    cy.get('html').should('have.class', 'dark');

    // Should change the theme to light
    cy.get('@trigger').click();
    cy.get('@light-selector').click();
    cy.get('html').should('have.class', 'light');

    // The dropdown elements should not be visible and should have the appropriate state
    cy.get('@trigger').should('have.attr', 'data-state', 'closed');
    cy.get('[data-slot="dropdown-menu-item"]').should('not.exist');
  });
});
