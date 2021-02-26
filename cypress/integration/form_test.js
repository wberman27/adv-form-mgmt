beforeEach(() => {
    cy.visit('http://localhost:3000/')
})

it('Sanity check', () =>{
    expect(1+1).to.equal(2)
})

const textInput = () => cy.get('input[name=name]')
const emailInput = () => cy.get('input[name=email]')
const passInput = () => cy.get('input[name=password]')
const tosCheckbox = () => cy.get('input[name=tos]')
const submitButton = () => cy.get('#submitButton')
const formValid = () => cy.get('div[class=errors]')

it('Filling out inputs', () =>{
    textInput()
        .type('William')
        .should('have.value', 'William')

    emailInput()
        .type('will@email.com')
        .should('have.value', 'will@email.com')

    passInput()
        .type('1234')
        .should('have.value', '1234')

    formValid() 
        .children().should('have.text', 'Password must be at least 6 characters.')
    //checks if page contains this error, it SHOULD
    //children of div class "errors" will be on DOM (and not empty) if there is an error

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
    cy.contains('Billy') //the form submission should work and add 'Billy' to users
})

it('Checks empty input form validation', () =>{
    textInput()
        .type('William{selectall}{backspace}') //type in a name then delete it for error
    formValid()
        .children().should('have.text', 'Name is required.') // this error should be on page
})

it('Checks for no errors on page start', () => {
    formValid()
        .children().should('have.text', '') //Error children should have empty txt
})