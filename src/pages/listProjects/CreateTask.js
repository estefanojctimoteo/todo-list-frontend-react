import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import {
  useStore,
  useActions
} from '../../store'

const CreateTask = (props) => {

  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const [description, setName] = useState('')

  let navigate = useNavigate()

  const { genericStructure } = appState.generic  

  const projectId = props && props.projectId ? props.projectId : '.'  
  const lstProjects = genericStructure && 
    genericStructure.lstProjects && genericStructure.lstProjects.value ?
    genericStructure.lstProjects.value : []

  const indx = lstProjects.findIndex(x => x._id === projectId)  
  const lstIdx = `lstTasks_${indx}`

  const handlePost = () => {
    if (!localStorage.getItem('todoToken') || !appState.user.loggedUser || !appState.user.loggedUser._id) {
        navigate('/signin')
    }  
    
    genericActions.dispatchCreateOrUpdateResource(
      dispatch,
      { route: 'tasks', routeGET: 'tasks/project' },
      { 
        projectId: props.projectId,
        description: description 
      },
      {
        projectId: props.projectId,
      },
      lstIdx)
  }

  const preventDefault = (event) => {
    event.preventDefault()
  }
  
  const handleChange = name => event => {
    switch(name) {
      case 'description':
        setName(event.target.value)
        break
      default:
        break      
    }
  }

  useEffect(() => {
    setName('')
  }, [appState.generic.lstTasks])

  return (
    <form onSubmit={preventDefault}>
    <div className='card-containers'>
      <div className='create-task-left'>
        <input onChange={handleChange('description')} value={description} id="inputDescription" className="form-control" placeholder="Task" />  
      </div>
      <div className='create-task-right'>
        <button onClick={handlePost} className="btn btn-success ml-1">Add</button>
      </div>
    </div>
    </form>
  )
}

export default CreateTask