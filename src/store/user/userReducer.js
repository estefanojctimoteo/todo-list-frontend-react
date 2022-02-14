/////////////////////////////////////////////
//#region imports

import { 
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  ERROR_USER_MESSAGE,
  USER_LOGOUT_REQUEST,
  USER_AUTHENTICATED_BY_TOKEN_FOUND,
  
} from './userTypes'

//#endregion imports
/////////////////////////////////////////////

/////////////////////////////////////////////
//#region INITIAL_STATE

const INITIAL_STATE = { 
  loggedUser: {},
  authenticated: false,  
  isFetching: false, 
  loginOk: false,
  error: false,
  errorUserMessage: '',  

}

//#endregion INITIAL_STATE
/////////////////////////////////////////////

/////////////////////////////////////////////
//#region userReducer

export const userReducer = (state = INITIAL_STATE, action) => {
  if (!action || !action.type) {
    return state
  }  
  switch(action.type){
    case USER_AUTHENTICATED_BY_TOKEN_FOUND:
    case USER_LOGIN_REQUEST:      
      return {
        ...state, 
        loggedUser: {},
        error: false,
        loginOk: false,
        errorUserMessage: '',
        isFetching: true,
        authenticated: false,        
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,         
        loggedUser: {
          _id: action.userId,
          userName: action.name, 
          email: action.email,           
        },
        error: false,
        loginOk: true,
        isFetching: false,
        authenticated: true,         
      }
    case USER_LOGOUT_REQUEST:      
      return {
        ...state,
        authenticated: false,
        keepLoggedIn: false,
        keepLoggedInRequested: false,
        loggedUser: {},
      }
    case ERROR_USER_MESSAGE:
      return {
        ...state,
        isFetching: false, 
        errorUserMessage: action.errorUserMessage,
        error: true
      }
    default:
      return state
  }
}

//#endregion userReducer
/////////////////////////////////////////////