import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom"

import CardProject from './CardProject'
import CreateProject from './CreateProject'

import {
  useStore,
  useActions
} from '../../store'

import './style.css'

const ListProject = (props) => {
  const { appState, dispatch } = useStore()
  const { genericActions } = useActions()

  const { genericStructure } = appState.generic

  const lstProjects = genericStructure && 
    genericStructure.lstProjects && genericStructure.lstProjects.value ?
    genericStructure.lstProjects.value : []

  const userId = appState.user && appState.user.loggedUser && appState.user.loggedUser._id ? appState.user.loggedUser._id : '.' 

  useEffect(() => {
      genericActions.dispatchGET
      (dispatch, 
       'projects/user', 
       { userId: userId }, 
       'lstProjects')    
  }, [dispatch, genericActions, userId])

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
      <div className="container-fluid">
        <div className='card-containers'>
          <div className='left'>
            <div className="row">
              {lstProjects.map(project => 
                <CardProject key={project._id} _id={project._id} name={project.name} />
              )}
            </div>
          </div>
          <div className='right'>
            <CreateProject />
          </div>
        </div>
      </div>    
    </div>
  )
}

export default ListProject