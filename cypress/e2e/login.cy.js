Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Tes Login OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Action: membuka halaman login
  });

it('TC001 - Valid login with correct username and password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.screenshot('TC001 - Valid login');
  });

it('TC002 - Invalid password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');

    cy.screenshot('TC002 - Invalid password');
  });

it('TC003 - Invalid username', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');

    cy.screenshot('TC003 - Invalid username');
  });

it('TC004 - Username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-field-error-message')
      .should('contain', 'Required');
      
    cy.screenshot('TC004 - Username kosong');
  });

it('TC005 - Password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-field-error-message')
      .should('contain', 'Required');

    cy.screenshot('TC005 - Password kosong');
  });

it('TC006 - Username dan password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);

    cy.screenshot('TC006 - Username dan password kosong');
  });

it('TC007 - Username dengan spasi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('   ', { parseSpecialCharSequences: false });
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
    .should('contain', 'Required');

    cy.screenshot('TC007 - Username dengan spasi');
  });

it('TC008 - Password dengan spasi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('   ', { parseSpecialCharSequences: false });
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
    .should('contain', 'Required');

    cy.screenshot('TC008 - Password dengan spasi');
  });

it("TC009 - SQL injection di username", () => {
    cy.get('input[name="username"]').type("' OR '1'='1");
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC009 - SQL injection di username');
  });

it("TC010 - SQL injection di password", () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC010 - SQL injection di password');
  });

it('TC011 - Case sensitive password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC011 - Case sensitive password');
  });

it('TC012 - Password pendek', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ad');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC012 - Password pendek');
  });

it('TC013 - Username dengan simbol', () => {
    cy.get('input[name="username"]').type('admin!@#');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC013 - Username dengan simbol');
  });

it('TC014 - Login setelah logout', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    // Action logout:
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    // Assertion kembali ke halaman login:
    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');

    cy.screenshot('TC014 - Login setelah logout');
});

it('TC015 - Karakter spesial di password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123#@!');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC015 - Karakter spesial di password');
  });

it('TC016 - Paste password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.screenshot('TC016 - Paste password');
  });

it('TC017 - Double click login', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').dblclick();
    cy.url().should('include', '/dashboard');

    cy.screenshot('TC017 - Double click login');
  });

it('TC018 - Capslock aktif password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC018 - Capslock aktif password');
  });

it('TC019 - Spasi setelah username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin ', { parseSpecialCharSequences: false });
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Assertion:
    cy.url().should('include', '/dashboard');

    cy.screenshot('TC019 - Spasi setelah username');
  });

it('TC020 - Spasi sebelum username', () => {
    cy.get('input[name="username"]').type(' Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('exist');

    cy.screenshot('TC020 - Spasi sebelum username');
  });
});