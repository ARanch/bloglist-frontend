import { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import UserHeader from './components/UserHeader'
import SaveBlog from './components/SaveBlog.js'
import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications' // https://www.npmjs.com/package/react-notifications



// todo: add notifications for succesful and unsuccesful blog creation, login, and logout

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState({ type: 'error', message: null, title: null, timer: 2000, counter: 0 })

  if (token === null) {
    if (window.localStorage.getItem('loggedUser')) {
      const restoredUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      setToken(restoredUser.token)
      setUser(restoredUser.userName)
    }
  }

  /** updateNotification
   * @param {string} type 
   * @param {string} message 
   * @param {string} title 
   * @param {int} timer
   */
  const updateNotification = (type, message, title, timer = 2000) => {
    const newNotification = { type, message, title, timer, counter: 0 }
    newNotification.counter = notification.counter += 1
    newNotification.type = type
    newNotification.message = message
    newNotification.title = title
    newNotification.timer = timer
    setNotification(newNotification)
    console.log(notification)
  }

  useEffect(() => {
    if (notification.counter) {
      switch (notification.type) {
        case 'error':
          console.log('🔥', 'error notification:', notification)
          NotificationManager.error(notification.message, notification.title, notification.timer)
          break
        case 'success':
          console.log('🎉', 'success notification:', notification)
          NotificationManager.success(notification.message, notification.title, notification.timer)
          break
        default:
          NotificationManager.error(notification.message, notification.title, notification.timer)
          break
      }
    }
  }, [notification.message])

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
        <LoginForm setUser={setUser} setToken={setToken} updateNotification={updateNotification} />
        <NotificationContainer />
      </div>
    )
  }

  return (
    <div>
      <div>
        {user ? <UserHeader User={user} updateNotification={updateNotification} /> : null}
        {blogs ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : null}
        {token ? <SaveBlog token={token} blogs={blogs} setBlogs={setBlogs} notification={updateNotification} /> : null}
        <NotificationContainer />
      </div>
    </div>
  )
}

export default App
