// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

/**
 * Resets the database
 * @arg {none}
 */
Cypress.Commands.add('resetDb', () => {
	cy.request('POST', 'http://localhost:3001/api/testing/reset')
})

Cypress.Commands.add('login', ({ userName, password }) => {
	cy.request('POST', 'http://localhost:3001/api/login', {
		userName, password
	}).then(({ body }) => {
		localStorage.setItem('loggedUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', ({ title, author = 'cypress', url = 'cypress.io', likes=0 } = {}) => {
	cy.request({
		url: 'http://localhost:3001/api/blogs',
		method:  'POST',
		body: { title, author, url, likes },
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
		} })
		.then(() => {
			cy.visit('http://localhost:3000')
		})
})

Cypress.Commands.add('addUser', ({ userName='rango', name='rango rango', password='123' } = {}) => {
	const user = {
		userName: userName,
		name: name,
		password: password
	}
	cy.request('POST', 'http://localhost:3001/api/users/', user)
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })