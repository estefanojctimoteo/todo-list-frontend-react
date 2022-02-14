import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import {
  useStore,
  useActions
} from '../../store'

const CreateProject = (props) => {

  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const [name, setName] = useState('')

  let navigate = useNavigate()

  const handlePost = () => {
    if (!localStorage.getItem('todoToken') || !appState.user.loggedUser || !appState.user.loggedUser._id) {
        navigate('/signin')
    }  
    
    genericActions.dispatchCreateOrUpdateResource(
      dispatch,
      { route: 'projects', routeGET: 'projects/user' },
      { 
        userId: appState.user.loggedUser._id,
        name: name 
      },
      {
        userId: appState.user.loggedUser._id
      },
      'lstProjects')
  }

  const preventDefault = (event) => {
    event.preventDefault()
  }
  
  const handleChange = name => event => {
    switch(name) {
      case 'name':
        setName(event.target.value)
        break
      default:
        break      
    }
  }

  useEffect(() => {
    setName('')
  }, [appState.generic.lstProjects])

  return (
    <form className='text-center' onSubmit={preventDefault}>
      <div className="card card-width mx-2 my-2 card-padding create-project-background-color">
        <div className="card-body">
          <h6 className="card-title card-title-font-size">Create a new project</h6>
          <label htmlFor="inputEmail" className="sr-only"></label>
          <input onChange={handleChange('name')} value={name} id="inputName" className="form-control my-2" placeholder="Project name" />        
          <button onClick={handlePost} className="btn btn-block btn-info">Create Project</button>
        </div>
      </div>  
    </form>
  )
}

export default CreateProject