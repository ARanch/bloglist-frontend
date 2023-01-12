import { useState } from 'react'
// import axios from 'axios'

const SaveBlog = ({ addBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSave = (event) => {
		event.preventDefault()
		const newBlog = {
			title: title,
			author: author,
			url: url
		}
		addBlog(newBlog)
	}

	return (
		<form id="blogsave" onSubmit={handleSave}>
			<div>
				<input id="blogTitle" input="title" name="Title" placeholder="Title"
					onChange={({ target }) => setTitle(target.value)} />
			</div>
			<div>
				<input id="blogAuthor" input="author" name="Author" placeholder="Author"
					onChange={({ target }) => setAuthor(target.value)} />
			</div>
			<div>
				<input id="blogUrl" input="url" name="Url" placeholder="Url"
					onChange={({ target }) => setUrl(target.value)} />
			</div>
			<div>
				<button id="createBlogButton" type="submit">Create</button>
			</div>
		</form>
	)
}

export default SaveBlog