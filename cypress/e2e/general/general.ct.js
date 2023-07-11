describe('Generic Test Suite - General', () => {


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach((() => {
        cy.visit('/');
    }))

    it('does page load', () => {
        cy.get('#main-content').should('exist');
        cy.get('#unit-content').should('exist');
        cy.get('#unit-footer').should('exist');
    })

    it('can log in', () => {
        cy.visit('/user/login');
        cy.get('#edit-name').click().type(Cypress.env('username'))
        cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
        cy.get('#edit-submit').click();
        cy.wait(2000);
        cy.get('.toolbar-menu-administration').should('exist');
    })

    context('while logged in', () => {
        beforeEach((() => {
            cy.visit('/user/login');
            cy.get('#edit-name').click().type(Cypress.env('username'))
            cy.get('#edit-pass').click().type(Cypress.env('password'), { log: false })
            cy.get('#edit-submit').click();
        }))


        it('devel and devel generate turned off', () => {
            cy.visit('/admin/modules');
            cy.get('#edit-text').type('devel').type('{enter}');
            cy.get('#edit-modules-devel-enable').should('not.be.checked');
            cy.get('#edit-modules-devel-enable').click();
            cy.get('#edit-modules-devel-enable').should('be.checked');
            cy.get('#edit-modules-devel-generate-enable').should('not.be.checked');
            cy.get('#edit-modules-devel-generate-enable').click();
            cy.get('#edit-modules-devel-generate-enable').should('be.checked');
        })

        it('correct font enabled', () => {
            cy.visit('/admin/appearance')
            cy.get('.theme-default').should('exist');
            cy.get('.theme-default').get('.action-link--icon-cog').first().click();
            cy.get('#edit-clf-fonts').should('exist');

            // If Prod, font should be `Whitney - Production version`
            cy.get('#edit-clf-fonts').within(() => {
                //cy.get('option[selected="selected"]').should('have.text', 'Whitney - Production version');

                cy.get('option[selected="selected"]').should('have.text', 'Open Sans / Merriweather - Google CDN');
                    // on testing site, this is the real font, otherwise above test fails
            })
        })
    })
})