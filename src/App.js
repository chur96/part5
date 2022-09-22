import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Toggle'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if(loggedInUser){
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginForm = () => (
    <form id='login' onSubmit={handleLogin}>
    <div>
      <label>Username</label>
      <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}></input>
    </div>
    <div>
      <label>Password</label>
      <input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)}></input>
    </div>
    <button type='submit'>Login</button>
    </form>
    )
  

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(
        blogObject
      )
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisible()

    } catch (exception) {
      setMessage('Could not save blog')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const Notification = ({message}) => {
    const notif = message === ''
      ? message 
      : <div className='notification'>{message}</div>
    return notif
  }

  return (
    <div>
      <Notification message={message}></Notification>
      {user === null && loginForm()}
      <h2>blogs</h2>
      {user !== null && (
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>Log out</button>
        </div>
        )}
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
