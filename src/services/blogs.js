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

export default { getAll,setToken,createNewBlog }