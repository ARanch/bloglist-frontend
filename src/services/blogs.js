import axios from 'axios'
const baseUrl = '/api/blogs'

const sortBlogs = (blogs) => {
	return blogs.sort((a, b) => b.likes - a.likes)
}

const getBlogs = async (token, setBlogs) => {
	console.log(getBlogs.name, '🔑 token:', token || '❎ no token')
	const config = { headers: { Authorization: `Bearer ${token}` } }
	try {
		const response = await axios.get(baseUrl, config)
		console.log('✅', 'blogs fetched')
		const sortedBlogs = sortBlogs(response.data)
		console.log(' 📖 sortedBlogs:', sortedBlogs)
		setBlogs(sortedBlogs)
		return sortedBlogs
	}
	catch (error) {
		console.log('❌', 'an error occured')
		console.log(error)
	}
}

/**
 *
 * @param {string} blogs
 * @param {string} blog
 * @param {string} token
 * @param {function} updateNotification
 * @returns sortedBlogs
 */

const saveBlog = async (blogs, blog, token, updateNotification) => {
	// log current file name and line number
	console.log(saveBlog.name, '🔑 token:', token || '❎ no token')
	const config = { headers: { Authorization: `bearer ${token}` } }
	try {
		// post blog to server
		const response = await axios.post(baseUrl, blog, config)
		console.log('✅', 'blog saved')
		// make and sort new blog list
		const newBlogList = [...blogs, response.data]
		const sortedBlogs = sortBlogs(newBlogList)
		updateNotification ? updateNotification('success', 'Blog saved', '📝') : null
		return sortedBlogs
	}
	catch (error) {
		console.log('❌', 'an error occured – no blog was added.')
	}

}


export default {
	getBlogs,
	sortBlogs,
	saveBlog
}