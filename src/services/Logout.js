import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom"

import {
  useStore,
  useActions
} from '../../store'

const Logout = (props) => {  
  const { dispatch } = useStore()
  const { userActions } = useActions()

  useEffect(() => {
    localStorage.removeItem('todoToken')
    dispatch(userActions.userLogoutRequestReducer())
  })
  return (
    <div>
      <Navigate
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
      />
    </div>
  )
}
export default Logout