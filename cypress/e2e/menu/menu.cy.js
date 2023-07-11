describe('Generic Test Suite - Menu', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach((() => {
        cy.visit('/');
        cy.visit('/user/login');
        cy.get('#edit-name').click().type(Cypress.env('username'))
        cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
        cy.get('#edit-submit').click();
        cy.get('.toolbar-menu-administration').should('exist');
    }))

    it('can access menu page', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main menu');
    })

    it('assert no errors', () => {
        cy.visit('admin/structure/menu/manage/main');
        cy.get('.page-title').contains('Edit menu Main menu');
        cy.get('.messages').should('not.exist');
    })

    it('can access menu list', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
    })

    it('assert no errors', () => {
        cy.visit('admin/structure/menu');
        cy.get('.page-title').contains('Menus');
        cy.get('.messages').should('not.exist');
    })
})