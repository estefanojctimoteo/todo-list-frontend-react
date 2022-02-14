import React from 'react'

import Authentication from './Authentication'

export const requireAuth = (ComposedComponent, authenticated, authorized) => {
  return <Authentication 
    ComposedComponent={ComposedComponent}
    authenticated={authenticated}
    authorized={authorized}
   />
}