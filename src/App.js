import React, { useEffect, useState } from 'react'

import SpaComponent from './SpaComponent'

import { useStore, useActions } from './store'
import LogConsole from './services/LogConsole'

export const App = (props) => { 
  const { appState, dispatch } = useStore()
  const { userActions } = useActions()  
  const [ authenticated, setAuthenticated ] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem("todoToken")
    if (!token) {
      setAuthenticated(false)
    }
    else
    if (token && appState.user.loggedUser.email === '') {
      setAuthenticated(true)
      userActions.dispatchUserAuthByTokenFound(dispatch, token)
    } else
    if (!authenticated && token && appState.user.loggedUser.email !== '') {
      setAuthenticated(true)
    } else
    if (authenticated && token && appState.user.loggedUser.email !== '') {
    }
  }, [authenticated, appState.user.authenticated])

  return (
    <div className="App">
      <SpaComponent authenticated={authenticated}/>
      <LogConsole />
    </div>
  )
}