import React from 'react'

import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import CreateTask from './CreateTask'
import ListTask from  './listTasks'
import ListTaskDone from  './listTasksDone'

import {
  useStore,
  useActions
} from '../../store'

const CardProject = (props) => {

  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const name = props && props.name ? props.name : ''
  const _id = props && props._id ? props._id : ''

  const handleDelete = () => {    
      genericActions.confirmDispatch(
        '', '',
        confirmAlert,
        dispatch,
        { route: 'projects', routeGET: 'projects/user' },
        _id,
        { userId: appState.user.loggedUser._id },
        'lstProjects'
      )
  }

  return (
    <div className="card card-width mx-2 my-2">
      <div className="card-header">        
        <div className='card-containers'>
          <div className='card-header-left'>
            <h5>{name}</h5>
          </div>
          <div className='card-header-right'>            
            <FontAwesomeIcon icon={faPencil} size="1x" style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="left" title="Edit" />            
            <FontAwesomeIcon icon={faTrash} size="1x" className='ml-2'  
              style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="left" 
              title="Remove" onClick={() => {handleDelete()}} />    
          </div>            
        </div>        
      </div>
      <div className="card-body">
        <h5 className="card-title">To Do</h5>
        <ListTask projectId={_id}  />
        <h5 className="card-title mt-4">Done</h5>
        <ListTaskDone projectId={_id}  />
        <div className='mt-4'>
          <CreateTask projectId={_id} />
        </div>
      </div>
    </div>    
  )
}

export default CardProject