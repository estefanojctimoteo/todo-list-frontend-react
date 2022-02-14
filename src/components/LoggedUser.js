import React from 'react'


import {
  useStore
} from '../store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'

const LoggedUser = () => {
  const { appState  } = useStore()  

  if (!localStorage.getItem('todoToken')) {
    return <div></div>
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href='/signin'>{}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <a className="navbar-brand" data-toggle="tooltip" data-placement="left" title="Sign out" href='/signin'>
            {appState.user.loggedUser.userName}
            <FontAwesomeIcon icon={faHouseUser} size="1x" className='sign-in-icon mx-2' />
          </a>
        </form>
      </div>
    </nav>
  )
}

export default LoggedUser