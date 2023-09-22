import React,{ useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog,getBlogs,toggleVisibility,visible }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlogEntry = () => {
    if (window.confirm('Do you really want to delete this blog entry?')){
      blogService.deleteEntry(blog)
    }
  }

  const addOneLike = (e) => {
    blogService.increaseLike(blog)
    getBlogs()
  }

  // console.log(blog)
  return (
    <div style={blogStyle}>
      <div>
        <div style={{ display:'flex',flexDirection:'column' }}>
          <h2 className='title'>{blog.title}</h2>
          <p className='author'>By: {blog.author}</p>
        </div>
      </div>
      <Togglable buttonLabel={'See more details'}>
        <div className='details' style={{ marginBottom:'20px' }}>
          <span className='likes' style={{ marginRight:'20px' }}>{blog.likes}</span><button onClick={addOneLike} id={blog.id} className='likeBtn'>Like</button>
          <p className='url'>{blog.url}</p>
          <p>{blog.user.name}</p>
          <button onClick={deleteBlogEntry}>Delete this entry</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog