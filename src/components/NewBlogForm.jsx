import React,{ useState } from 'react'
import { Toast } from '../App'

const NewBlogForm = ({ createBlog }) => {
  const [blogTitle,setBlogTitle] = useState('')
  const [blogAuthor,setBlogAuthor] = useState('')
  const [blogUrl,setBlogUrl] = useState('')
  const [newBlogAlert,setNewBlogAlert] = useState('')

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setBlogAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setBlogUrl(e.target.value)
  }

  const addNewBlog = (e) => {
    e.preventDefault()
    try{
      createBlog({
        title:blogTitle,
        author:blogAuthor,
        url:blogUrl
      })
      setNewBlogAlert(`New Blog by ${blogAuthor} titled ${blogTitle} has been added`)
      setTimeout(() => {
        setNewBlogAlert(null)
      }, 5000)
    } catch(e) {
      setNewBlogAlert(`Error: ${e.response.data.error}`)
      setTimeout(() => {
        setNewBlogAlert(null)
      }, 5000)
    }

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <>
      <Toast toastMsg={newBlogAlert}/>
      <h2>Add new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
                Title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            placeholder='Title of the article'
            onChange={handleTitleChange}
            id='article-title'
          />
        </div>
        <div>
                Author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            placeholder='The person who wrote this'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
                URL
          <input
            type="text"
            value={blogUrl}
            name="URL"
            placeholder='Article web link address'
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </>
  )
}

export default NewBlogForm