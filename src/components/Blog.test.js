import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog>', () => {

    let container
    const user = null
    const blog = {
        title: 'test blog',
        author: 'test user',
        url: 'test.com',
        likes: 0,
        user: {
            name: 'test'
        }
    }
    const mockHandler = jest.fn()

    beforeEach(() => {
        container = render(<Blog blog={blog} user={user} likePost={mockHandler}></Blog>).container
    })

    test('blog renders with url,likes not visible', () => {

        const blog = container.querySelector('.blog')
        expect(blog).not.toHaveStyle('display: none')

        const toggleContent = container.querySelector('.toggleContent')
        expect(toggleContent).toHaveStyle('display: none')
    })

    test('url and likes are visible after toggling', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const toggleContent = container.querySelector('.toggleContent')
        expect(toggleContent).not.toHaveStyle('display: none')
    })

    test('clicking like twice make two function calls', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const likeButton = container.querySelector('.likeButton')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})