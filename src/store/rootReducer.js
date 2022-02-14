import { combineReducers } from 'redux'
import { userReducer } from './user/userReducer'
import { genericReducer } from './generic/genericReducer'

export default combineReducers({  
  generic: genericReducer,
  user: userReducer,
})