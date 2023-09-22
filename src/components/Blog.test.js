import React from 'react'
import '@testing-library/jest-dom'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { Button } from './Blog'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

//5.13
test('renders content', () => {
  const blog = {
    author: 'Jay Indino',
    title: 'Blog Title',
    url: 'www.w.co',
    likes: '999',
    user: {
      name: 'Jay'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug()

  const author = container.querySelector('.author')
  const title = container.querySelector('.title')
  const details = container.querySelector('.togglableContent')

  expect(author).toHaveTextContent('Jay Indino')
  expect(title).toHaveTextContent('Blog Title')
  expect(details).toHaveStyle('display: none')
})

//5.14
test('blog details only show when button is clicked', async() => {
  const blog = {
    author: 'Jay Indino',
    title: 'Blog Title',
    url: 'www.w.co',
    likes: '999',
    user: {
      name: 'Jay'
    }
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler}/>)
  const likes = container.querySelector('.likes')
  const url = container.querySelector('.url')
  screen.debug()

  const user = userEvent.setup()
  const button = screen.getByText('See more details')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(likes).toHaveTextContent('999')
  expect(url).toHaveTextContent('www.w.co')
})


//5.15
test('like button is clicked twice', async() => {
  const mockHandler = jest.fn()
  const blog = {
    author: 'Jay Indino',
    title: 'Blog Title',
    url: 'www.w.co',
    likes: '999',
    user: {
      name: 'Jay'
    }
  }

  render(<button onClick={mockHandler}>Like</button>)
  const button = screen.getByText('Like')
  screen.debug()

  const user = userEvent.setup()
  await user.dblClick(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

//5.16
test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog} />)
  // screen.debug()

  const title = screen.getByPlaceholderText('Title of the article')
  const author = screen.getByPlaceholderText('The person who wrote this')
  const url = screen.getByPlaceholderText('Article web link address')
  const sendButton = screen.getByText('Add Blog')

  await user.type(title, 'Article Title')
  await user.type(author, 'Jay')
  await user.type(url, 'abc.xyz')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  // console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('Article Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Jay')
  expect(createBlog.mock.calls[0][0].url).toBe('abc.xyz')
})