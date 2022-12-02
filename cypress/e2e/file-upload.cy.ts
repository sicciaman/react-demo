describe('People Details File upload', () => {
    beforeEach(() => {
        cy.visit('');
        localStorage.clear();
    });

    it('should upload and invalid file and show an error message', () => {
        cy.get('[data-testid="error-alert"]').should('not.exist');

        // Upload file with an invalid extension
        cy.get('input[type=file]').attachFile('wrong_file_type.txt', {allowEmpty: true});

        // Check if error message is correctly showed
        cy.get('[data-testid="error-alert"]').should('exist');
        cy.get('[data-testid="error-alert"]').should('contain', 'Only JSON files are allowed');
    });

    it('should upload file correctly and show data in a table', () => {
        // Initially data table should not exists
        cy.get('[data-testid="data-table"]').should('not.exist');

        // Upload correct JSON file
        cy.get('input[type=file]').attachFile('people.json');

        // Now table element should exist and all people should be showed on the table
        cy.get('[data-testid="data-table"]').should('exist');
        cy.get('[data-testid="table-body"] > tr').should('have.length', 5);

        // Search a person by name and check if table rows are filtered by inserted query
        cy.get('input[type=text]').type('John');
        cy.get('[data-testid="table-body"] > tr').should('have.length', 2);

        // Search a specific person by name using case-insensitive
        cy.get('input[type=text]').clear();
        cy.get('input[type=text]').type('john "da');
        cy.get('[data-testid="table-body"] > tr').should('have.length', 1);

        // Search for a 'partial' person and check if it's present an indicator
        cy.get('input[type=text]').clear();
        cy.get('input[type=text]').type('Jack');
        cy.get('[data-testid="table-body"] > tr').should('contain', '❌');

        // Last metadata reading details shouldn't be available yet
        cy.get('[data-testid="reading-metadata"]').should('not.exist');

        // Reload page and check if last reading has been saved
        cy.reload();
        cy.get('[data-testid="reading-metadata"]').should('exist');
        cy.get('[data-testid="file-name"]').should('contain', 'people.json');

    });

});
