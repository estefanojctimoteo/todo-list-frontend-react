//
//////////////////////////////////////////////
//#region IMPORTS

//#region './genericTypes'
import {
  GET_RESOURCE_BY_ID_REQUEST,
  GET_RESOURCE_BY_ID_SUCCESS,

  GENERIC_ERROR_MSG,
  SET_GENERIC_MSG,

  CREATE_RESOURCE_REQUEST,

  RESOURCE_SELECTED,
  DELETE_RESOURCE_REQUEST,

  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_SUCCESS,

  SET_SUCCESS,
  MESSAGE_SUCCESS,

  EMPTY_DATA_ALL_RESOURCES,

  GET_TO_COLLECTION_REQUEST,
  GET_TO_COLLECTION_SUCCESS,

  SET_FETCHING_DATA_FALSE,

  PUT_OBJECT_IN_STATE,
  REMOVE_OBJECT_FROM_STATE,

} from './genericTypes'
//#endregion './genericTypes'

//#region Outros imports
import axios from 'axios'
import createRest from '../createRest'

import {
  implementedRoutes,
  defineUrl
} from '../defineUrl'

import { 
  defineErrorMsg
} from '../../util/functions'

//#endregion Outros imports

//#endregion IMPORTS
//////////////////////////////////////////////
//
//////
//
//////////////////////////////////////////////
//#region DISPATCHS 

export const dispatchGET = (dispatch, group, filter, collectionKeyName, idResourceSelected, rootDestination) => {
  let obj = { key: collectionKeyName, route: group, filter: filter }
  if (idResourceSelected && idResourceSelected > 0) { 
    obj.idResourceSelected = idResourceSelected
  }
  if (rootDestination) {
    obj.rootDestination = rootDestination
  }
  dispatchGetToCollection(dispatch, new Array(obj))
}
export const dispatchGetToCollection = (dispatch, arrayObjects) => {
  dispatch(getToCollectionRequest(arrayObjects))
  const rest = createRest(axios)
  try {
    arrayObjects.forEach((_obj, idx) => {
      rest
        .get(defineUrlOrDispatchError(
          dispatch,
          'GET',
          _obj.route,
          _obj.idResourceSelected ? _obj.idResourceSelected : -1,
          (_obj.filter ? Object.assign({}, _obj.filter) : {})
        ))
        .then(res => {
          let data = res.data.data ? res.data.data : res.data ? res.data : {}
          if (_obj.idResourceSelected) {            
            dispatch(getResourceByIdSuccess(Array.isArray(data) && data.length > 0 ? data[0] : data))
          }
          else {
            _obj.value = data            
            dispatch(getToCollectionSuccess(_obj))
          }
        })
        .catch(err => {
          dispatch(genericErrorMsg(defineErrorMsg(err)))
        })
    })
  }
  catch (e) {
    dispatch(genericErrorMsg(defineErrorMsg(e)))
  }
}
////////////////////////////////////////
export const dispatchResourceSelected = (dispatch, group, idResourceSelected, data) => {
  dispatch(resourceSelected(group, idResourceSelected))
  if (!data) {
    dispatchGET(dispatch, group, {}, null, idResourceSelected)
    return
  }
  switch (group) {
    default:
      dispatchGET(dispatch, group, {}, null, idResourceSelected)
      break
  }
}
export const dispatchGetResourceById = (dispatch, group, idResourceSelected) => {
  const rest = createRest(axios)
  try {
    if (typeof (idResourceSelected) === 'number' && idResourceSelected % 1 === 0 && idResourceSelected > 0) {
      let route = defineUrlOrDispatchError(dispatch, 'GET', group, idResourceSelected)
      let dados = []
      rest
        .get(route)
        .then(res => {
          dados = res.data.data ? res.data.data :
            res.data ? res.data : {}
          dispatch(getResourceByIdSuccess(Array.isArray(dados) && dados.length > 0 ? dados[0] : dados))
        })
        .catch(err => {
          dispatch(genericErrorMsg(defineErrorMsg(err)))
        })
    }
  }
  catch (e) {
    dispatch(genericErrorMsg(defineErrorMsg(e)))
  }
}
export const dispatchCreateOrUpdateResource = (dispatch, group, resource, filter, collectionKeyName) => {
  dispatch(
    (resource.id || resource._id) ?
      updateResourceRequest(group, resource, filter) :
      createResourceRequest(group, resource, filter)
  )

  let route
  const rest = createRest(axios)

  try {
    if (!resource.id && !resource._id) {
      route = defineUrlOrDispatchError(dispatch, 'POST', group)
      rest
        .post(route, resource)
        .then(res => {
          dispatchSuccessOrNot(dispatch, group, filter, collectionKeyName, (res.data && res.status && parseInt(res.status,10) >= 200))
        })
        .catch(err => {
          dispatch(genericErrorMsg(defineErrorMsg(err)))
        })
    }
    else {
      let methodRoute = (group !== null && typeof group === 'object' && group.route ? group.route : group)
      let updateMethod = methodRoute.indexOf('done') < 0 ? 'PUT' : 'PATCH'
      if (updateMethod === 'PUT') {
        route = defineUrlOrDispatchError(dispatch, updateMethod, group, resource.id)
        rest
          .put(route, resource)
          .then(res => {
            dispatchSuccessOrNot(dispatch, group, filter, collectionKeyName, (res.data && res.data.success))
          })
          .catch(err => {
            dispatch(genericErrorMsg(defineErrorMsg(err)))
          })
      } else {
        route = 
          defineUrlOrDispatchError
            (dispatch, updateMethod, group, (resource.id ? resource.id : resource._id), filter)
        rest
          .patch(route, resource)
          .then(res => {
            dispatchSuccessOrNot(dispatch, group, filter, collectionKeyName, (res.status && parseInt(res.status,10) === 204), true)
          })
          .catch(err => {
            dispatch(genericErrorMsg(defineErrorMsg(err)))
          })
      }
    }
  }
  catch (e) {
    dispatch(genericErrorMsg(defineErrorMsg(e)))
  }
}
export const dispatchSuccessOrNot = (dispatch, group, filter, collectionKeyName, success, patch) => {
  if (success) {
    dispatch(setSuccess())
    dispatch(mensagemSucesso('Sucess!'))
    let route = (group !== null && typeof group === 'object' && group.routeGET ? group.routeGET : group)
    if (collectionKeyName != null) {
      let arrayObjects = []
      let obj = {
        key: collectionKeyName, 
        route: route, 
        filter: filter 
      }
      arrayObjects.push(obj)
      if (patch && route === 'tasks/done/project') {

        const indx = collectionKeyName.split('_')[1]  
        const lstIdx = `lstTasks_${indx}`
      
        obj = {
          key: lstIdx, 
          route: 'tasks/project', 
          filter: filter 
        }
        arrayObjects.push(obj)
      }
      dispatchGetToCollection(dispatch, arrayObjects)         
    }
  }
  else {
    dispatch(genericErrorMsg('Não foi possível obter uma resposta para a operação solicitada!'))
  }
}
export const dispatchDeleteResource = (dispatch, group, id, filter, collectionKeyName, complementaryKey) => {
  dispatch(deleteResourceRequest(group, id, filter))

  const rest = createRest(axios)
  try {
    if (typeof (id) === 'string' && id.length > 0) {
      let route = defineUrlOrDispatchError(dispatch, 'DELETE', group, id, filter, complementaryKey)
      rest
        .delete(route)
        .then(res => {          
          dispatchSuccessOrNot(dispatch, group, filter, collectionKeyName, (res.status && parseInt(res.status,10) === 204))
        })
        .catch(err => {
          dispatch(genericErrorMsg(defineErrorMsg(err)))
        })
    }
  }
  catch (e) {
    dispatch(genericErrorMsg(defineErrorMsg(e)))
  }
}
export const defineUrlOrDispatchError = (dispatch, method, group, id = -1, filter = {}, complementaryKey) => {
  group = group !== null && typeof group === 'object' && group.route ? group.route : group
  if (implementedRoutes.indexOf(group) < 0) {
    let msgErro = `Route [ ${group} ] not implemented yet.`
    dispatch(genericErrorMsg(msgErro))
    throw msgErro
  }
  return defineUrl(method, group, id, filter, complementaryKey)
}

//#endregion DISPATCHS
//////////////////////////////////////////////
//
//////
//
//////////////////////////////////////////////
//#region GET

export const getResourceByIdRequest = (group, idResourceSelected) => {
  return {
    type: GET_RESOURCE_BY_ID_REQUEST,
    group,
    idResourceSelected,
  }
}
export const getResourceByIdSuccess = (dataResourceSelected) => {
  return {
    type: GET_RESOURCE_BY_ID_SUCCESS,
    dataResourceSelected,
  }
}
export const getToCollectionRequest = (arrayObjects) => {
  return {
    type: GET_TO_COLLECTION_REQUEST,
    arrayObjects,
  }
}
export const getToCollectionSuccess = (object) => {
  return {
    type: GET_TO_COLLECTION_SUCCESS,
    object,
  }
}

//#endregion GET
//////////////////////////////////////////////
//
//////
//
//////////////////////////////////////////////
//#region DELETE

export const confirmDispatch = (title, message, confirmAlert, dispatch, group, id, filter, collectionKeyName, resource) => {
  confirmAlert({
    title: title && title !== '' ? title : 'Confirm:',
    message: message && message !== '' ? message : 'Do you really want to delete the resource?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          if (!resource)
            dispatchDeleteResource(dispatch, group, id, filter, collectionKeyName, false)
          else
            dispatchCreateOrUpdateResource(dispatch, group, resource, filter, collectionKeyName)
        }
      },
      {
        label: 'No',
        onClick: () => {
        }
      }
    ]
  })
}
export const deleteResourceRequest = (group, id, filter) => {
  return {
    type: DELETE_RESOURCE_REQUEST,
    group,
    id,
    filter,
  }
}
//#endregion DELETE
//////////////////////////////////////////////
//
//////
//
//////////////////////////////////////////////
//#region POST / PUT

export const createResourceRequest = (group, resource, filter) => {
  return {
    type: CREATE_RESOURCE_REQUEST,
    group,
    resource,
    filter,
  }
}
export const setSuccess = () => {
  return {
    type: SET_SUCCESS,
  }
}
export const mensagemSucesso = (msg) => {
  return {
    type: MESSAGE_SUCCESS,
    msg,
  }
}
export const updateResourceRequest = (group, resource, filter) => {
  return {
    type: UPDATE_RESOURCE_REQUEST,
    group,
    resource,
    filter,
  }
}
export const updateResourceSuccess = (group, resource) => {
  return {
    type: UPDATE_RESOURCE_SUCCESS,
    group,
    resource,
  }
}

//#endregion POST / PUT
//////////////////////////////////////////////
//
//////
//
//////////////////////////////////////////////
//#region  ---> OUTROS <--- (INICIO)-------
//
//////
//
//////////////////////////////////////////////
//#region ---> OTHER
export const limpaDataTodosResources = () => {
  return {
    type: EMPTY_DATA_ALL_RESOURCES,
  }
}
export const genericErrorMsg = (errorMsg) => {
  return {
    type: GENERIC_ERROR_MSG,
    errorMsg,
  }
}
export const setGenericMsg = (msg) => {
  return {
    type: SET_GENERIC_MSG,
    msg,
  }
}
export const resourceSelected = (group, idResourceSelected) => {
  return {
    type: RESOURCE_SELECTED,
    group,
    idResourceSelected,
  }
}
export const setBuscandoDadosFalse = () => {
  return {
    type: SET_FETCHING_DATA_FALSE,
  }
}
export const putObjectInState = (obj, objName, rootDestination) => {
  return {
    type: PUT_OBJECT_IN_STATE,
    obj,
    objName,
    rootDestination,
  }
}
export const removeObjectFromState = (objName, rootPosition) => {
  return {
    type: REMOVE_OBJECT_FROM_STATE,
    objName,
    rootPosition,
  }
}
//#endregion ---> ITHER
//////////////////////////////////////////////
//
//////
//
//
//////
//
//#endregion  ---> OUTROS <--- (FIM)-------
//////////////////////////////////////////////
//
//////
//
