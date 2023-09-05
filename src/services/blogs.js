import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.get(baseUrl,config)
  return request.data
}

const createNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl,newBlog,config)
  return response
}

const increaseLike = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const updatedBlog = {
    title: blogData.title,
    author: blogData.author,
    url: blogData.url,
    likes: blogData.likes + 1,
    user: blogData.user._,
  }

  const response = await axios.put(`${baseUrl}/${blogData.id}`,updatedBlog,config)
  return response
}

const deleteEntry = async(blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogData.id}`,config)
  return response
}

export default { getAll,setToken,createNewBlog,increaseLike,deleteEntry }