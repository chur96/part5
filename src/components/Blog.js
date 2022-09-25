import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user }) => {

    const [visible, setVisible] = useState(false)

    const showIfVisible = { 'display': visible ? '' : 'none' }
    const hideIfVisible = { 'display': visible ? 'none' : '' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async () => {
        const newBlog = { ...blog, likes: blog.likes+1 }
        await blogService.update(blog.id, newBlog)
    }

    const handleDelete = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            <div style={hideIfVisible}>
                {blog.title} {blog.author}
                <button onClick={() => {setVisible(!visible)}}>View</button>
            </div>
            <div style={showIfVisible}>
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => {setVisible(!visible)}}>Hide</button>
                </div>
                <ul>
                    <li>{blog.url}</li>
                    <li>{blog.likes} <button onClick={handleLike}>Like</button> </li>
                    <li>{blog.user.name}</li>
                </ul>
                {user !== null && user.name === blog.user.name && <button onClick={handleDelete}>Remove</button>}
            </div>
        </div>
    )}

export default Blog