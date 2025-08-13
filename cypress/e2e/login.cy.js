describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Email is required.').should('be.visible');
    cy.contains('Password is required.').should('be.visible');
  });

  it('shows error for wrong email', () => {
    cy.get('input[name="email"]').type('wrongemail@example.com');
    cy.get('input[name="password"]').type('Heaven12$');
    cy.get('button[type="submit"]').click();
    cy.contains('Login failed. Check credentials.').should('be.visible');
  });

  it('shows error for wrong password', () => {
    cy.get('input[name="email"]').type('euniceogunshola@gmail.com');
    cy.get('input[name="password"]').type('WrongPassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Login failed. Check credentials.').should('be.visible');
  });

  it('logs in successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('euniceogunshola@gmail.com');
    cy.get('input[name="password"]').type('Heaven12$');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });
});
