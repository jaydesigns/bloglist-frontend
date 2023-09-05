import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

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
  const [toastMsg,setToastMsg] = useState(null)

  const getBlogs = async () => {
    const res = await blogService.getAll()
    console.log(res);
    setBlogs( res.sort((a,b) => b.likes - a.likes) )  
  }

  useEffect(() => {
    getBlogs()
  },[user])

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
      <Togglable buttonLabel={'Create New Blog'}>
        <NewBlogForm setToastMsg={setToastMsg} getBlogs={getBlogs}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} getBlogs={getBlogs}/>
      )}
    </div>
  )
}

export default App