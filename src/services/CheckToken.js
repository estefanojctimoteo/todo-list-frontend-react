import React, { useEffect } from 'react'
import decode from 'jwt-decode'
import { tokenIsValid } from '../util/functions'
const CheckToken = (props) => {
  const { setAuthenticated } = props
  useEffect(() => {
    const timer = setInterval(() => {      
      const token = localStorage.getItem("todoToken")
      if (!token) {
        setAuthenticated(false)
      }
      else {
        if (!tokenIsValid((decode(token)).exp)) {
          localStorage.removeItem('todoToken')
        }
      }
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div></div>
}
export default CheckToken