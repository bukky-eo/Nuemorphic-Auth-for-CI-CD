describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Name is required.').should('be.visible');
    cy.contains('Email is required.').should('be.visible');
    cy.contains('Phone number is required.').should('be.visible');
    cy.contains('Password is required.').should('be.visible');
    cy.contains('Please confirm your password.').should('be.visible');
    cy.contains('You must agree to the terms.').should('be.visible');
  });

  it('shows password mismatch error', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="password"]').type('Heaven12$');
    cy.get('input[name="confirmPassword"]').type('WrongConfirm');
    cy.get('input[name="acceptedTerms"]').check();
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match.').should('be.visible');
  });

  it('registers successfully with valid input', () => {
    const randomEmail = `test+${Date.now()}@example.com`;

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="password"]').type('Heaven12$');
    cy.get('input[name="confirmPassword"]').type('Heaven12$');
    cy.get('input[name="acceptedTerms"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });
});
