import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import {
  useStore,
  useActions
} from '../../../store'

const Task = (props) => {
  const _id = props._id
  const description = props.description
  const projectId = props && props.projectId ? props.projectId : '.' 

  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const { genericStructure } = appState.generic  
  
  const lstProjects = genericStructure && 
    genericStructure.lstProjects && genericStructure.lstProjects.value ?
    genericStructure.lstProjects.value : []

  const indx = lstProjects.findIndex(x => x._id === projectId)  
  const lstIdx = `lstTasks_${indx}`

  const handleDelete = () => {    
    genericActions.confirmDispatch(
      '', '',
      confirmAlert,
      dispatch,
      { route: 'tasks', routeGET: 'tasks/project' },
      _id,
      { projectId: projectId },
      lstIdx
    )
  }  

  const lstDoneIdx = `lstTasksDone_${indx}`  
  const handleDone = () => {
    genericActions.dispatchCreateOrUpdateResource(
      dispatch,
      { route: 'tasks/done', routeGET: 'tasks/done/project' },
      { 
        _id: _id,        
      },
      {
        projectId: props.projectId,
      },
      lstDoneIdx)
  }    

  return (
    <div className='card-containers'>
      <div className='create-task-left'>
        <input type='checkbox' className='mr-2' />      
        <span className='task-font-color'>{description}</span>
      </div>
      <div className='create-task-right'>
        <FontAwesomeIcon icon={faCheck} size="1x" 
          style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="left" 
          title="Done" onClick={() => {handleDone()}} />            
        <FontAwesomeIcon icon={faTrash} size="1x" className='ml-2'  
          style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="left" 
          title="Remove" onClick={() => {handleDelete()}} />    
      </div>
    </div>
  )
}

export default Task