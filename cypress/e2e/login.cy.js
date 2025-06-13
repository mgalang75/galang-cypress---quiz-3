describe('Tes Login OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Action: membuka halaman login
  });

  it('Positive Case - Valid Login', () => {
    cy.get('input[name="username"]').type('Admin'); // Action
    cy.get('input[name="password"]').type('admin123'); // Action
    cy.get('button[type="submit"]').click(); // Action

    // Assertion
    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain', 'Dashboard');
  });

  it('Negative Case - Invalid Password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('Negative Case - Empty Fields', () => {
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });
});
