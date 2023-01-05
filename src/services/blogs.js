import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlogs = async (token, setBlogs) => {
  console.log(getBlogs.name, '🔑 token:', token || '❎ no token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await axios.get(baseUrl, config)
    console.log('✅', 'blogs fetched')
    console.log(response.data)
    setBlogs(response.data)
    return response.data
  }
  catch (error) {
    console.log('❌', 'an error occured')
    console.log(error)
  }
}

export default { getBlogs }