import { baseURL } from '../util/baseUrl'
function createRest(axios, tokenEventual){
  const token = localStorage.getItem('todoToken')
  const rest = axios.create({
    baseURL: baseURL,
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  return rest  
}
export default createRest