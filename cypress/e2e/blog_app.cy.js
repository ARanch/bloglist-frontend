describe('When logged out', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.addUser() // adds default user with userName: 'rango', name: 'rango rango' and password: '123'
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function() {
		cy.contains('Welcome to the Blogs app 👋')
		cy.contains('Login')
	})

	it('user can be logged in', function() {
		cy.get('#username').type('rango')
		cy.get('#password').type('123')
		cy.get('#loginBtn').click()

		cy.contains('Welcome to the Blogs app 👋')
		cy.contains('rango logged in')
	})

	it('cannot log in with wrong password', function() {
		cy.get('#username').type('rango')
		cy.get('#password').type('wrong')
		cy.get('#loginBtn').click()

		cy.contains('Login failed')

	})
})
describe('When logged in', function() {
	beforeEach(async function() {
		await cy.resetDb()
		cy.addUser() // adds default user with userName: 'rango', name: 'rango rango' and password: '123'
		cy.login({ userName: 'rango', password: '123' }) // logs in with default user
	})

	it('a new blog can be added', function() {
		cy.createBlog({ title: 'A newly added blog', author: 'Cypress', url: 'cypress.io' })
	})

	it('a blog can be liked', function() {
		cy.createBlog({ title: 'blog to be liked 2', author: 'cypress like', url: 'cypress.io' })
		cy.contains('blog to be liked 2').parent().as('blog')

		cy.get('@blog').contains('show details').as('showDetailsBtn')
		cy.get('@showDetailsBtn').click()

		cy.get('@blog').contains('hide details').as('hideDetailsBtn')
		cy.contains('👍 Like').parent().as('likeBtn')

		// user can like a blog
		cy.get('@likeBtn').click()
		cy.contains('1 likes')

		// user can't like a blog twice
		cy.get('@likeBtn').click()
		cy.contains('1 likes')
	})

	it('the user who created a blog can delete it', function() {
		// create and find blog
		cy.createBlog({ title: 'blog to be deleted', author: 'cypress delete', url: 'cypress.io' })
		cy.contains('blog to be deleted').parent().as('blog')

		// show details and delete
		cy.get('@blog').contains('show details').as('showDetailsBtn')
		cy.get('@showDetailsBtn').click()
		cy.contains('🗑️ Delete').parent().as('removeBtn')
		cy.get('@removeBtn').click()

		// blog should now be deleted
		cy.contains('blog to be deleted').should('not.exist')
	})

	it.only('only user who created a blog can delete it', function(){
		cy.createBlog({ title: 'blog to be deleted', author: 'cypress delete', url: 'cypress.io' })
		cy.addUser({ userName: 'Another user', name: 'Dude', password: '123' })
		cy.login({ userName: 'Another user', password: '123' })

		cy.contains('blog to be deleted').parent().as('blog')
		cy.get('@blog').contains('show details').as('showDetailsBtn')
		cy.get('@showDetailsBtn').click()

		cy.contains('🗑️ Delete').parent().as('removeBtn')
		cy.get('@removeBtn').click()

		cy.contains('blog to be deleted').should('exist')
	})
})

