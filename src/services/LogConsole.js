import { useEffect } from 'react'

import {
  useStore,
} from '../store'

const LogConsole = (props) => {
  const { appState } = useStore()  

  useEffect(() => {
    /*
    console.log('-------------------- appState.generic -------------------')
    Object
      .entries(appState.generic)
      .forEach(([key, value]) => {        
        if (['genericStructure'].indexOf(key) < 0) {
          console.log(key+':',JSON.stringify(value))        
        }
      })
    console.log('----------------------')
    console.log('--> genericStructure: ')
    Object
      .entries(appState.generic.genericStructure)
      .forEach(([key, value]) => {
        console.log('----> ' +key+':',JSON.stringify(value))
      })
    console.log('---------------------------------------------------------')
    console.log('appState.user:', JSON.stringify(appState.user))
    console.log('---------------------------------------------------------')
    */
  }, [appState])

  return null
}
export default LogConsole