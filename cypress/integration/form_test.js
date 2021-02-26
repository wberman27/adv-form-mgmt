beforeEach(() => {
    cy.visit('http://localhost:3000/')
})

it('sanity check', () =>{
    expect(1+1).to.equal(2)
})

const textInput = () => cy.get('input[name=text]')
const emailInput = () => cy.get('input[name=email]')
const passInput = () => cy.get('input[name=password]')
const tosCheckbox = () => cy.get('input[name=tos]')
const submitButton = () => cy.get('#submit')
const formValid = () => cy.get('errors')

it('Filling out inputs', () =>{
    textInput()
    .should('have.value', '')
    .type('William')
    .should('have.valie', 'William')

    emailInput()
    .should('have.value', '')
    .type('will@email.com')
    .should('have.valie', 'will@email.com')

    passInput()
    .should('have.value', '')
    .type('1234')
    .should('have.valie', '1234')

})

it('Check the ToS box', () =>{
    tosCheckbox()
    .check()
    .should('be.checked')
})

it('Can submit', () =>{
    submitButton()
    textInput().type('Billy')
    emailInput().type('Billyjoe@email.com')
    passInput().type('mypassword1234')
    tosCheckbox().check()
    submitButton().click()
    cy.contains('Billy')
})

it('Checks for form validation', () => {
    formValid()
    .should('not.exist')
})