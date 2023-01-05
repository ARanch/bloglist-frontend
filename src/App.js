import { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'

// todo get blogs når user er logget ind - både ved start, og som callback
// todo vis blogs når hentet
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (token) {
      blogService.getBlogs(token, setBlogs)
    }
  }, [token])

  useEffect(() => {
    console.log(' 📖 blogs:', blogs)
  }, [blogs])

  if (user === null) {
    return (
      <div>
        <LoginForm setUser={setUser} setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      {user ? <h1>Hej {user}!</h1> : null}
      {/* <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App
