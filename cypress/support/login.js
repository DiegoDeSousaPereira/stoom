import { cpf } from 'cpf-cnpj-validator';

Cypress.Commands.add('generateValidCPF', () => {
    Cypress.env('cpfValido', cpf.generate())
});

Cypress.Commands.add('cadastrar', () => {
    cy.visit('/cadastro?origem=home')
    cy.get('#nome').type('Teste automação');
    cy.get('#cpf').type(Cypress.env('cpfValido'));
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#cellphone').clear().type('(11)99999-9999');
    const senha = 'SenhaForte@123';
    cy.get('#password').type(senha);
    cy.get('#password2').type(senha);
    cy.contains('Criar sua conta no Tenda atacado').click()
    cy.get('[class="btn-create-account"]').click()
});



Cypress.Commands.add('login', (username, password) => {
    cy.get(LoginSelectors.usernameField).clear(); // Garante o campo limpo
    if (username) {
        cy.get(LoginSelectors.usernameField).type(username);
    }

    cy.get(LoginSelectors.passwordField).clear(); // Garante o campo limpo
    if (password) {
        cy.get(LoginSelectors.passwordField).type(password);
    }

    cy.get(LoginSelectors.loginButton).click();
});

Cypress.Commands.add('sessionLogin', () => {
    const login = () => {
        cy.visit('/');
        cy.login(Cypress.env('username'), Cypress.env('password'));
    };
    cy.session(Cypress.env('username'), login);
});
