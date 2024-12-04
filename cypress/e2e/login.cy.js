describe('Teste da feature login', () => {
    beforeEach(function () {
        cy.fixture("user").as('userData');
        cy.fixture("messages").as('messageData');
        cy.visit('/');
    });

    it('Deve exibir mensagem de erro quando o username é obrigatório', function () {
        cy.generateValidCPF()
        cy.gerarEmailTemporario()
        cy.cadastrar()
        cy.buscarCodigoEnviado()
    });
});
