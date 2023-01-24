import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SaveBlog from './SaveBlog'

const createBlog = () => {
	const blogs = {
		title: 'Testbloggen',
		author: 'Testforfatteren',
		url: 'www.testurl.ost',
		likes: 1
	}
	return blogs
}

test('setBlogs is called with the right info when a new blog is created', async () => {
	// create a blog
	const blog = createBlog()

	const mockAddBlog = jest.fn()  // mock function
	// render the component
	render(<SaveBlog addBlog={mockAddBlog}/>)
	// get the inputs and button
	const user = userEvent.setup()
	const titleInput = screen.getByPlaceholderText('Title')
	const aurthorInput = screen.getByPlaceholderText('Author')
	const urlInput = screen.getByPlaceholderText('Url')
	const button = screen.getByText('Create')

	// fill in the inputs and click the button
	await user.type(titleInput, blog.title)
	await user.type(aurthorInput, blog.author)
	await user.type(urlInput, blog.url)
	await user.click(button)

	// check that the mock function is called once and with the correct info
	expect(mockAddBlog.mock.calls).toHaveLength(1) //checks that the handler is called once
	expect(mockAddBlog.mock.calls[0][0].title).toBe(blog.title) //checks that title in call is correct
	expect(mockAddBlog.mock.calls[0][0].author).toBe(blog.author) //checks that author in call is correct
	expect(mockAddBlog.mock.calls[0][0].url).toBe(blog.url) //checks that url in call is correct

})