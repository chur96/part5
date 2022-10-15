import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Toggle'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
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

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

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

    const handleLike = async (blogObject) => {
        await blogService.update(blogObject.id, blogObject)
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

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

    const Notification = ({ message }) => {
        const notif = message === ''
            ? message
            : <div className='notification'>{message}</div>
        return notif
    }

    return (
        <div>
            <Notification message={message}></Notification>
            <h2>blogs</h2>
            {user === null &&
            <LoginForm
                login={handleLogin}
                username={username}
                password={password}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
            >
            </LoginForm>
            }
            {user !== null && (
                <div>
                    {user.name} is logged in
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
            <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog}></BlogForm>
            </Togglable>
            {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
                <Blog key={blog.id} blog={blog} user={user} likePost={handleLike}/>
            )}
        </div>
    )
}

export default App
