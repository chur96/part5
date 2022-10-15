import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Blog Form', () => {

    let container
    const mockHandler = jest.fn()

    beforeEach(() => {
        container = render(<BlogForm createBlog={mockHandler}></BlogForm>).container
    })

    test('Create blog',async () => {
        const user = userEvent.setup()
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const createBlog = container.querySelector('#submitBlog')

        await user.type(titleInput, 'test title')
        await user.type(authorInput, 'test author')
        await user.type(urlInput, 'test url')
        await user.click(createBlog)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('test title')
        expect(mockHandler.mock.calls[0][0].author).toBe('test author')
        expect(mockHandler.mock.calls[0][0].url).toBe('test url')

    })

})