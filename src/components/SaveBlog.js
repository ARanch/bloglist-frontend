import { useState } from 'react'
import axios from 'axios'

const SaveBlog = ({ token, blogs, setBlogs, updateNotification }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSave = async (event) => {
		event.preventDefault()
		const newBlog = {
			title: title,
			author: author,
			url: url
		}
		console.log('📝', 'new blog:', newBlog)
		const config = { headers: { Authorization: `bearer ${token}` } }
		try {
			const response = await axios.post('/api/blogs', newBlog, config)
			console.log('📝', 'response:', response)
			const newBlogList = [...blogs, response.data]
			console.log('📝', 'blogs:', newBlogList)
			setBlogs(newBlogList)
			updateNotification('success', 'Blog saved', '📝')
			document.getElementById('blogsave').reset()
		}
		catch (error) {
			console.log('❌', 'an error occured – no blog was added.')
		}

	}

	return (
		<form id="blogsave" onSubmit={handleSave}>
			<div>
				<input input="title" name="Title" placeholder="Title"
					onChange={({ target }) => setTitle(target.value)} />
			</div>
			<div>
				<input input="author" name="Author" placeholder="Author"
					onChange={({ target }) => setAuthor(target.value)} />
			</div>
			<div>
				<input input="url" name="Url" placeholder="Url"
					onChange={({ target }) => setUrl(target.value)} />
			</div>
			<div>
				<button type="submit">Create</button>
			</div>
		</form>
	)
}

export default SaveBlog