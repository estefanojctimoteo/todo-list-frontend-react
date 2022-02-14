import * as userActions from './user/userActions'
import * as genericActions from './generic/genericActions'
import { bindActionCreators } from 'redux'

const rootActions = dispatch => {
  return {
    genericActions: bindActionCreators(genericActions, dispatch),
    userActions:  bindActionCreators(userActions, dispatch),  
  }
}

export default rootActions