import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (e) => {
        e.preventDefault()
        await createBlog({
            title, author, url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form id='blogForm' onSubmit={addBlog}>
            <div>
                <div>
                  Title: <input type='text' value={title} placeholder='title' onChange={({ target }) => setTitle(target.value)}></input>
                </div>
                <div>
                  Author: <input type='text' value={author} placeholder='author' onChange={({ target }) => setAuthor(target.value)}></input>
                </div>
                <div>
                  URL: <input type='text' value={url} placeholder='url' onChange={({ target }) => setUrl(target.value)}></input>
                </div>
            </div>
            <button id='submitBlog' type='submit'>Create</button>
        </form>
    )
}

export default BlogForm