import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

//import Logout from './services/Logout'

import SignInPage from './pages/signin'
import ListProject from './pages/listProjects'
import LoggedUser from './components/LoggedUser'
import NotFound from './NotFound'

const SpaComponent = () => {

  return (
    <div>
      <LoggedUser />
      <Router>
        <Routes>
          <Route path="*" element={ <NotFound /> } />
          <Route path="/" element={ <SignInPage /> } />
          <Route path="/signin" element={ <SignInPage /> } />
          <Route path="/signup" element={ <SignInPage /> } />
          <Route path="/projects" element={ <ListProject /> } />
        </Routes>
      </Router>
    </div>
  )
}
export default SpaComponent