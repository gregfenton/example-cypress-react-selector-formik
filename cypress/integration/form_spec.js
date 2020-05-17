describe('Use cypress react selector to test the form', () => {
  const EMAILADDRESS = 'bugs.bunny@test.com';
  const PASSWORD = 'SUPER SECRET STUFFZ';

  before(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('log email field properties', () => {
    cy.react('MyTextInput', { field: { name: 'email' } }).should(($input) => {
      cy.log('react() is', $input);
      expect($input).to.have.length(1);

      let x = $input[0];
      cy.log('x is', x);
      cy.log('x.name is', x.name);
      cy.log('x.placeholder is', x.placeholder);
    });
  });

  it('enter data into the fields', () => {
    cy.react('MyTextInput', { field: { name: 'email' } }).type(EMAILADDRESS);
    cy.react('MyTextInput', { field: { name: 'password' } }).type(PASSWORD);
  });

  it('validate email value prop runtime', () => {
    cy.getReact('MyTextInput', { field: { name: 'email' } })
      .getProps('field.value')
      .should('eq', EMAILADDRESS);
  });

  it('submit the form', () => {
    cy.get('button').click();
  });

  it('validate the results', () => {
    let regexp = new RegExp(
      `^{[^"]+"email": "${EMAILADDRESS}",[^"]*"password": "${PASSWORD}"[^}]*\\}`,
      'm'
    );
    cy.get('.result-field').contains(regexp);
  });
});
