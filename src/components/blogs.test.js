import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// import login from '../services/login'

const createBlog = () => {
	const blog = {
		title: 'Testbloggen',
		author: 'Testforfatteren',
		url: 'www.testurl.ost',
		likes: 0
	}
	return blog
}

test('renders blog', () => {
	// const note = {
	// 	content: 'Component testing is done with react-testing-library',
	// 	important: true
	// }
	const blog = createBlog()

	render(<Blog blog={blog} />)

	const element = screen.getByText(/testbloggen/i) // case insensitive regex sea
	// console.log(screen.debug()) // renders the entire DOM to the screen
	// console.log(screen.debug(element)) // renders the element to the screen
	expect(element).toBeDefined()
	// console.log(screen.debug()) // renders the entire DOM to the screen
})

test('info is hidden if nothing is clicked', () => {
	const blog = createBlog()

	render(<Blog blog={blog} />)


	const re = RegExp(`${blog.url}`) // case insen`itive regex saved as variable`
	const element = screen.getByText(re) // case insensitive regex sea
	expect(element).not.toBeVisible()
	// console.log(screen.debug()) // renders the entire DOM to the screen
})

test('info is shown when show-info button is clicked', async () => {
	const blog = createBlog()

	render(<Blog blog={blog} />)
	const re = RegExp(`${blog.url}`) // case insen`itive regex saved as variable`

	const button = screen.getByText(/show details/i)
	const element = screen.getByText(re) // case insensitive regex sea
	expect(element).not.toBeVisible() // element is not visible before clicking the button
	await button.click()
	expect(element).toBeVisible() // element is visible after clicking the button
})

test('a notification is shown when a blog is liked', async () => {
	const blog = createBlog()
	const mockHandler = jest.fn()  // mock function

	render(<Blog blog={blog} updateNotification={mockHandler}/>)


	const user = userEvent.setup()
	const button = screen.getByText('👍 Like')
	await user.click(button)
	await user.click(button)
	expect(mockHandler.mock.calls).toHaveLength(2) //checks that the handler is called once thes
})

