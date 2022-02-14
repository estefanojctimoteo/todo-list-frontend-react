import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom"

import {
  useStore,
  useActions
} from '../../../store'

import '../style.css'

import Task from './Task'

const ListTask = (props) => {
  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const { genericStructure } = appState.generic

  const projectId = props && props.projectId ? props.projectId : '.'  
  const lstProjects = genericStructure && 
    genericStructure.lstProjects && genericStructure.lstProjects.value ?
    genericStructure.lstProjects.value : []

  const indx = lstProjects.findIndex(x => x._id === projectId)  
  const lstIdx = `lstTasks_${indx}`

  const lstTasks = genericStructure && 
    genericStructure[lstIdx] && genericStructure[lstIdx].value ?
    genericStructure[lstIdx].value : []

  useEffect(() => {
      genericActions.dispatchGET
      (dispatch, 
       'tasks/project', 
       { projectId: projectId }, 
       lstIdx)    
  }, [dispatch, genericActions, projectId, lstIdx])

  if (!localStorage.getItem('todoToken')) {
    return (
      <Navigate
        to={{
          pathname: "/signin",
          state: { from: props.location }
        }}
      />
    )
  }

  return (
    <div>
      {lstTasks.map(task =>
        <Task key={task._id} _id={task._id} description={task.description} projectId={projectId} />
      )}
    </div>
  )
}

export default ListTask