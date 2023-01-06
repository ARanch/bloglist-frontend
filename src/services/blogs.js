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

export default { getBlogs, sortBlogs }