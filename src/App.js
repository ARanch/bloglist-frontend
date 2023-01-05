import { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import UserHeader from './components/UserHeader'
import SaveBlog from './components/SaveBlog'

// todo: add a form to add new blogs

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  if (token === null) {
    if (window.localStorage.getItem('loggedUser')) {
      const restoredUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      setToken(restoredUser.token)
      setUser(restoredUser.userName)
    }
  }

  useEffect(() => {
    if (token) {
      // get the blogs
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
      {user ? <UserHeader User={user} /> : null}
      {blogs ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : null}
      {user ? <SaveBlog /> : null}
    </div>
  )
}

export default App
