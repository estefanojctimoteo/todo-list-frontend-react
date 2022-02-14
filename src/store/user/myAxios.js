import axios from 'axios'
import { baseURL } from '../../util/baseUrl'

const token = localStorage.getItem('todoToken')

export default axios.create(
  token ?
    {
      baseURL: baseURL,
      headers:{
        Authorization: 'Bearer ' + token
      }
    } :
    { 
      baseURL 
    }
)