import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ERROR_USER_MESSAGE,
  USER_LOGOUT_REQUEST,
} from './userTypes'

import {
  implementedRoutes,
  defineUrl
} from '../defineUrl'

import createRest from '../createRest'
import axios from 'axios'
import decode from 'jwt-decode'

////////////////////
// userLoginAction
//
export const userLoginRequestReducer = () => {  
  return {
    type: USER_LOGIN_REQUEST,  
  }
}
export const dispatchCreateUser = (dispatch, name, email, password) => {
  dispatch(userLoginRequestReducer())

  const client = createRest(axios)

  client
    .post('users', { name, email, password })
    .then(data => {      
      if (data.data.accessToken) {
        const token = data.data.accessToken
        localStorage.removeItem('todoToken')
        localStorage.setItem('todoToken', token)
        const decoded = decode(token)        
        dispatch(
          userLoginSuccessReducer(decoded._doc._id, name, email)
        )
      } 
      else {        
        dispatch(errorMessageToUserReducer('(403) Access denied!'))
      }
    })
    .catch(e => {      
      if (e.response && e.response.status && e.response.status === 403) {        
        dispatch(errorMessageToUserReducer('(403) User email already exists'))
      }
      else {
          dispatch(errorMessageToUserReducer('Ops! There\'s something wrong...'))                  
      }
    })
}

export const dispatchUserLogin = (dispatch, email, password) => {
  dispatch(userLoginRequestReducer(email, password))

  const client = createRest(axios)

  client
    .post('auth', { email, password })
    .then(data => {
      if (data.data.accessToken) {
        const token = data.data.accessToken
        localStorage.setItem('todoToken', token)
        const decoded = decode(token)
        dispatch(
          userLoginSuccessReducer(decoded._doc._id, decoded._doc.name, decoded._doc.email)
        )
      }
      else {
        dispatch(errorMessageToUserReducer('(403) Access denied!'))
      }
    })
    .catch(e => {
      if (e.response && e.response.status && e.response.status === 403) {
        dispatch(errorMessageToUserReducer('(403) Access denied!'))
      }
      else {
        let code = (e.response && e.response.status && e.response.status > 0) ? e.response.status : -1
        if (code > 0 && e.response.statusText) {
          if (e.response.data && e.response.data.errors && e.response.data.errors.length > 0) {
            dispatch(errorMessageToUserReducer(e.response.data.errors[0]))
          }
          else {
            dispatch(errorMessageToUserReducer(e.response.statusText))
          }
        }
        else {
          dispatch(errorMessageToUserReducer('Ops! There\'s something wrong...'))          
        }
      }
    })
}

export const userLoginSuccessReducer = (userId, name, email) => {
  return {
    type: USER_LOGIN_SUCCESS,
    userId, name, email
  }
}

export const errorMessageToUserReducer = (errorUserMessage) => {
  return {
    type: ERROR_USER_MESSAGE,
    errorUserMessage
  }
}
export const userLogoutRequestReducer = () => {
  return {
    type: USER_LOGOUT_REQUEST
  }
}
export const dispatchUserAuthByTokenFound = (dispatch, token) => {
  const decoded = decode(token)
  dispatch(userLoginSuccessReducer(decoded._doc._id, decoded._doc.name, decoded._doc.email))
}

export const defineUrlOrDispatchError = (dispatch, method, group, id = -1, filter = {}, complementaryKey) => {
  group = group !== null && typeof group === 'object' && group.route ? group.route : group
  if (implementedRoutes.indexOf(group) < 0) {
    let errorMsg = `Route [ ${group} ] not implemented yet...`
    dispatch(errorMessageToUserReducer(errorMsg)) 
    throw errorMsg
  }
  return defineUrl(method, group, id, filter, complementaryKey)
}
