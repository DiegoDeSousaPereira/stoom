Cypress.Commands.add('gerarEmailTemporario',()=>{
    cy.request('GET', 'https://api.guerrillamail.com/ajax.php?f=get_email_address').then((response) => {
        Cypress.env('email', response.body.email_addr)
        const email = response.body.email_addr;
        cy.log(`E-mail gerado: ${email}`);
    });    
})

Cypress.Commands.add('buscarCodigoEnviado',()=>{
        cy.wait(5000); // Aguarde alguns segundos para receber o e-mail
        cy.request('GET', 'https://api.guerrillamail.com/ajax.php?f=check_email&seq=0').then((messages) => {
            const messageId = messages.body.list[0]?.mail_id;
            if (messageId) {
                cy.request(`https://api.guerrillamail.com/ajax.php?f=fetch_email&email_id=${messageId}`).then((message) => {
                    cy.log(`Conteúdo do e-mail: ${message.body.mail_body}`);
                    // Extraia o código do corpo do e-mail
                });
            }
        });
    });    