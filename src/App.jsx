import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Toast = ({toastMsg}) => {
  if (toastMsg===null) {
    return null
  }
  return (
    <div>
      {toastMsg}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user,setUser] = useState(null)
  const [blogTitle,setBlogTitle] = useState('')
  const [blogAuthor,setBlogAuthor] = useState('')
  const [blogUrl,setBlogUrl] = useState('')
  const [toastMsg,setToastMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      //save user auth to local storage
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setToastMsg('Wrong credentials')
      setTimeout(() => {
        setToastMsg(null)
      }, 5000)
    }
  }

  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  //Create BLOG
  const createBlog = async (e) => {
    e.preventDefault()

    try {
      const res = await blogService.createNewBlog({title:blogTitle,author:blogAuthor,url:blogUrl})
      setToastMsg(`New Blog by ${blogAuthor} titled ${blogTitle} has been added`)
      setTimeout(() => {
        setToastMsg(null)
      }, 5000)
    } catch(exception){
      setToastMsg(`Error: ${exception.response.data.error}`)
      setTimeout(() => {
        setToastMsg(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Toast toastMsg={toastMsg}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Toast toastMsg={toastMsg}/>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
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
        <button type="submit">Create New Blog</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App