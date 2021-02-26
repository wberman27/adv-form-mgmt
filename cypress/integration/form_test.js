describe('Form app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
})

it('sanity check', () =>{
    expect(1+1).to.equal(2)
})

const textInput = () => cy.get('input[name=text]')
const emailInput = () => cy.get('input[name=email]')

it('Filling out inputs', () =>{
    textInput()
    .should('have.value', '')
    .type('William')
    .should('have.valie', 'William')

    emailInput()
    .should('have.value', '')
    .type('will@email.com')
    .should('have.valie', 'will@email.com')

})