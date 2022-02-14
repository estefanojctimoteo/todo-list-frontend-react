import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from "react-router-dom"

import {
  useStore,
  useActions
} from '../../store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'

import './style.css'

const SignInPage = (props) => {

  const location = useLocation()
  const signIn = location.pathname.indexOf('signup') < 0

  const { appState, dispatch } = useStore()
  const { userActions } = useActions()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [token, setToken] = useState(false)

  const handleChange = name => event => {
    switch(name) {
      case 'name':
        setName(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
        break
      case 'passwd':
        setPasswd(event.target.value)
        break
      default:
        break      
    }
  }
  const handlePost = () => {
    setToken(true)
    if (signIn)
      userActions.dispatchUserLogin(dispatch, email, passwd )
    else
      userActions.dispatchCreateUser(dispatch, name, email, passwd )
  }

  const preventDefault = (event) => {
    event.preventDefault()
  }
  
  useEffect(() => {
    if (!token) {
      localStorage.removeItem('todoToken')
      dispatch(userActions.userLogoutRequestReducer())
    }
  
  }, [dispatch, userActions, token, props.location])    

  if (token && localStorage.getItem('todoToken')) {
    return (
      <Navigate
        to={{
          pathname: "/projects",
          state: { from: props.location }
        }}
      />
    )
  }

  return (
    <form className='text-center' onSubmit={preventDefault}>
      <div className="form-signin">
        <FontAwesomeIcon icon={faHouseUser} size="2x" className='sign-in-icon' />
        <h1 className="h3 mb-3 font-weight-normal">{signIn ? 'Please sign in' : 'Please sign up'}</h1>

        {!appState.user.isFetching && appState.user.error && appState.user.errorUserMessage &&
          <div className="alert alert-danger" role="alert">
            { appState.user.errorUserMessage }
          </div>
        }        
        {!signIn &&
          <div>
            <label htmlFor="inputName" className="sr-only">Name</label>
            <input onChange={handleChange('name')} value={name} id="inputName" className="form-control my-3" placeholder="Name" />  
          </div>
        }

        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input onChange={handleChange('email')} value={email} type="email" id="inputEmail" className="form-control my-3" placeholder="Email address" />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input onChange={handleChange('passwd')} value={passwd} type="password" id="inputPassword" className="form-control my-3" placeholder="Password" />
        <button onClick={handlePost} className="btn btn-lg btn-primary btn-block my-4" type="submit">{signIn ? 'Sign in' : 'Sign up'}</button>
        <div className='my-2'>
          <a href={(signIn ? '/signup' : '/signin')} >{signIn ? 'Sign up' : 'Sign in'}</a>
        </div>
      </div>
    </form>
  )
}

export default SignInPage