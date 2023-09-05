import React,{useState} from "react"
import blogService from '../services/blogs'

const Blog = ({ blog,getBlogs }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addOneLike = (e) => {
    blogService.increaseLike(blog)    
    getBlogs()
  }

  const deleteBlogEntry = () => {
    if (window.confirm("Do you really want to delete this blog entry?")){
      blogService.deleteEntry(blog)
    }
  }

  console.log(blog);
  return (
    <div style={blogStyle}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
        {blog.title}
        <button onClick={toggleVisibility}>{visible?'See less':'See more'}</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        <span>{blog.likes}</span><button onClick={addOneLike} id={blog.id}>like</button>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlogEntry}>Delete this entry</button>
      </div>
    </div>  
  )
}

export default Blog