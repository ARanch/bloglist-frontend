import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import testhelper from '../utils/testhelper'

test('renders blog', () => {
	// const note = {
	// 	content: 'Component testing is done with react-testing-library',
	// 	important: true
	// }
	const blog = testhelper.createBlog()


	render(<Blog blog={blog} />)

	const element = screen.getByText(/testbloggen/i) // case insensitive regex sea
	// console.log(screen.debug()) // renders the entire DOM to the screen
	// console.log(screen.debug(element)) // renders the element to the screen
	expect(element).toBeDefined()
	console.log(screen.debug()) // renders the entire DOM to the screen
})

test('info is hidden if nothing is clicked', () => {
	const blog = testhelper.createBlog()

	render(<Blog blog={blog} />)


	const re = RegExp(`${blog.url}`) // case insen`itive regex saved as variable`
	const element = screen.getByText(re) // case insensitive regex sea
	expect(element).not.toBeVisible()
	console.log(screen.debug()) // renders the entire DOM to the screen
})

test('info is shown when show-info button is clicked', async () => {
	const blog = testhelper.createBlog()

	render(<Blog blog={blog} />)
	const re = RegExp(`${blog.url}`) // case insen`itive regex saved as variable`

	const button = screen.getByText(/show details/i)
	const element = screen.getByText(re) // case insensitive regex sea
	expect(element).not.toBeVisible() // element is not visible before clicking the button
	await button.click()
	expect(element).toBeVisible() // element is visible after clicking the button
})

test('a notification is shown when a blog is liked', async () => {
	const blog = testhelper.createBlog()
	const mockHandler = jest.fn()  // mock function
	console.log(mockHandler)
	render(<Blog blog={blog} updateNotification={mockHandler}/>)
	const user = userEvent.setup()
	console.log(user)
	const button = screen.getByText('👍 Like')
	console.log(button)
	user.click(button)
	console.log(mockHandler.mock.calls)
	expect(mockHandler.mock.calls).toHaveLength(1) //checks that the handler is called once the like buttons is pressed
})