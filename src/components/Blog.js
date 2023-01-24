import { useState } from 'react'
import axios from 'axios'

const Blog = ({ blog, token, updateNotification }) => {
	const [visible, setVisible] = useState(false)
	const [likes, setLikes] = useState(blog.likes)
	const [incrementLikes, setIncrementLikes] = useState(true)
	const url = `http://${blog.url}`

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }
	const buttonStyle = { width: '100px' }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleDelete = async () => {
		const config = { headers: { Authorization: `bearer ${token}` } }
		try {
			const response = await axios.delete(`/api/blogs/${blog.id}`, config)
			console.log('🗑', 'response:', response)
			updateNotification('success', 'Blog deleted', '🗑')
			window.location.reload()
		} catch (error) {
			console.log('❌', 'an error occured – no blog was deleted.')
		}
	}
	const handleLike = async () => {
		console.log('👍', 'blog:', blog.id)
		const newBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1
		}
		const config = { headers: { Authorization: `bearer ${token}` } }
		try {
			console.log(incrementLikes, 'incrementLikes')
			if (incrementLikes) {
				const response = await axios.put(`/api/blogs/${blog.id}`, newBlog, config)
				console.log('👍', 'response:', response)
				setLikes(likes + 1)
				console.log(likes, 'likes')
				setIncrementLikes(false)
				console.log(incrementLikes, 'incrementLikes')
				updateNotification('success', 'Blog liked', '👍')
			} else if (incrementLikes === false) {
				updateNotification('error', 'You already liked this blog!', '❌😨')
				console.log('❌', 'you already liked this blog!')
			}
		} catch (error) {
			updateNotification('error', 'an error occured', '😨')
			console.log('❌', 'an error occured – no blog was liked.', error)
		}
	}
	return (
		<table className='blog' style={blogStyle} data-cy='blogEntry'>
			<tbody>
				<tr>
					<td>
						<button style={{ ...showWhenVisible, ...buttonStyle }} onClick={() => toggleVisibility()}>hide details</button>
						<button style={{ ...hideWhenVisible, ...buttonStyle }} onClick={() => toggleVisibility()}>show details</button>
					</td>
					<td width="200 px">
						{blog.title} {blog.author}
					</td>
					<td>
						<table>
							<tbody style={showWhenVisible}>
								<tr>
									<td>
										<button onClick={handleDelete}>🗑️ Delete</button>
									</td>
									<td>
										<button onClick={handleLike}>👍 Like</button>
									</td>
									<td>
										{likes} likes, <a href={url}> {blog.url}</a>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>

			</tbody>
		</table>
	)
}

export default Blog