import Form from "../../src/component/Form";


describe('Form.cy.jsx', () => {
  beforeEach(() => {
    cy.mount(<Form/>)
  })
  const todoSearched = [
    {
        text: "Learn about React",
        isEditing: false,
        subTaskText: ["Props", "Context"]
    }
]
  it('playground', () => {
     cy.get('[data-cy="headerField"]').contains('BOURNE Digital - TODO List');
     cy.get('[data-cy="searchField"]').should('have.value', "");
     cy.get('[data-cy="searchFieldtest"]').should('have.value', "");
     cy.get('[data-cy="searchFieldtest"]').type("pi");
     cy.get('[data-cy="searchFieldtest"]').should('have.value', "pi");
  })
})