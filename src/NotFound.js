import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div>
    <h4>404 - Not Found!</h4>
    <Link to="/signin">Go Home</Link>
  </div>
);

export default NotFound