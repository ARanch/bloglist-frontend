import { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    return (
      <div>
        <LoginForm onLogin={setUser} />
      </div>
    )
  }

  return (
    <div>
      {user ? <h1>Hej {user}!</h1> : null}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
