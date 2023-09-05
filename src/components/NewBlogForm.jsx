import React,{ useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setToastMsg,getBlogs }) => {
  const [blogTitle,setBlogTitle] = useState('')
  const [blogAuthor,setBlogAuthor] = useState('')
  const [blogUrl,setBlogUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()

    try {
      const res = await blogService.createNewBlog({ title:blogTitle,author:blogAuthor,url:blogUrl })
      console.log(res.data)
      setToastMsg(`New Blog by ${blogAuthor} titled ${blogTitle} has been added`)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setTimeout(() => {
        setToastMsg(null)
      }, 5000)
      getBlogs()
    } catch(exception){
      setToastMsg(`Error: ${exception.response.data.error}`)
      setTimeout(() => {
        setToastMsg(null)
      }, 5000)
    }
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={createBlog}>
        <div>
                Title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
                Author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
                URL
          <input
            type="text"
            value={blogUrl}
            name="URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </>
  )
}

export default NewBlogForm