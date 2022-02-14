import { 
  GENERIC_ERROR_MSG,
  SET_GENERIC_MSG,

  GET_RESOURCE_BY_ID_REQUEST,
  GET_RESOURCE_BY_ID_SUCCESS,

  CREATE_RESOURCE_REQUEST,

  SET_SUCCESS,
  MESSAGE_SUCCESS,

  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_SUCCESS,

  DELETE_RESOURCE_REQUEST,

  RESOURCE_SELECTED,

  EMPTY_DATA_ALL_RESOURCES,

  GET_TO_COLLECTION_REQUEST,
  GET_TO_COLLECTION_SUCCESS,

  SET_FETCHING_DATA_FALSE,

  PUT_OBJECT_IN_STATE,
  REMOVE_OBJECT_FROM_STATE,

} from './genericTypes'

const INITIAL_STATE = {
  genericStructure: {},
  dataMainReg: {},  
  buscandoDados: false,
  registroCarregado: false,
  operationSuccess: false,
  mensagemSucesso: '',
  deleteResource: false,
  error: false,
  errorMsg: '',
  genericMsg: '',
  grupoResourceSelected: '',
  idResourceSelected: -1,
  criandoResource: false,
}
let structure 
export const genericReducer = (state = INITIAL_STATE, action) => {
  if (!action || !action.type) {
    return state
  }
  switch(action.type){
    case DELETE_RESOURCE_REQUEST:
      return {
        ...state,
        error: false,
        errorMsg: '',
        genericMsg: '',
        operationSuccess: false,
        mensagemSucesso: '',
        deleteResource: true,
        registroCarregado: false,
        dataMainReg: {},
        criandoResource: false,
        idResourceSelected: -1,
      }
    case EMPTY_DATA_ALL_RESOURCES:
      let newState = Object.assign({}, INITIAL_STATE)
      newState.parametrizacaoGeral = state.parametrizacaoGeral ? state.parametrizacaoGeral : {}
      newState.dadosCliente = state.dadosCliente ? state.dadosCliente : {}
      return newState
    case GET_RESOURCE_BY_ID_REQUEST:
      return {
        ...state,
        registroCarregado: false,
        dataMainReg: {},
        error: false,
        errorMsg: '',
        genericMsg: '',
        criandoResource: false,
        operationSuccess: false,
        mensagemSucesso: '',
      }
    case GET_RESOURCE_BY_ID_SUCCESS:
      return {
        ...state,
        registroCarregado: true,
        dataMainReg: action.dataResourceSelected, 
        error: false,
        errorMsg: '',
        genericMsg: '',
      }
    case GENERIC_ERROR_MSG:
      return {
        ...state,
        error: true,
        errorMsg: action.errorMsg,
        genericMsg: '',
      }
    case SET_GENERIC_MSG:
      return {
        ...state,
        errorMsg: '',
        genericMsg: action.msg,
        operationSuccess: false,
        mensagemSucesso: '',        
      }
    case CREATE_RESOURCE_REQUEST:      
      return{
        ...state,
        dataMainReg: action.resource,
        error: false,
        errorMsg: '',
        genericMsg: '',
        operationSuccess: false,
        mensagemSucesso: '',
        deleteResource: false,
      } 
    case SET_SUCCESS:
      return {
        ...state,
        operationSuccess: true,
        deleteResource: false,
        error: false,
        errorMsg: '',
        genericMsg: '',
      }      
    case UPDATE_RESOURCE_REQUEST:
      return {
        ...state,
        registroCarregado: false,
        operationSuccess: false,
        mensagemSucesso: '',
        deleteResource: false,
        dataMainReg: action.resource,
        error: false,
        errorMsg: '',
        genericMsg: '',
      }  
    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        dataMainReg: action.resource,        
        operationSuccess: true,
        mensagemSucesso: '',
        deleteResource: false,
        error: false,
        errorMsg: '',
        genericMsg: '',
      }
    case RESOURCE_SELECTED:
      return {
        ...state,
        grupoResourceSelected: action.group,
        idResourceSelected: action.idResourceSelected, 
        criandoResource: action.idResourceSelected===-2 ? true : false,
        registroCarregado: false,
        dataMainReg: {},
        error: false,
        errorMsg: '',
        genericMsg: '',
        operationSuccess: false,
        mensagemSucesso: '',
      } 
    case GET_TO_COLLECTION_REQUEST:
      return {
        ...state,
        buscandoDados: true,
      }
    case SET_FETCHING_DATA_FALSE:
      return {
        ...state,
        buscandoDados: false,
      }
    case GET_TO_COLLECTION_SUCCESS:
      structure = action.object.rootDestination ? Object.assign({}, state[action.object.rootDestination]) : Object.assign({}, state.genericStructure)
      switch (action.object.key) {
        default:
          structure[action.object.key] = { filter: action.object.filter, value: action.object.value }
          break
      }
      return {
        ...state,
        [(action.object.rootDestination ? action.object.rootDestination : 'genericStructure')] : structure,
      }
    case PUT_OBJECT_IN_STATE:
      structure = action.rootDestination ? Object.assign({}, state[action.rootDestination]) : Object.assign({}, state.genericStructure)
      structure[action.objName] = action.obj
      return {
        ...state,
        [(action.rootDestination ? action.rootDestination : 'genericStructure')] : structure,
      }
    case REMOVE_OBJECT_FROM_STATE:
      structure = action.rootPosition ? Object.assign({}, state[action.rootPosition]) : Object.assign({}, state.genericStructure)
      if (structure[action.objName] !== null && structure[action.objName] !== undefined)
        delete structure[action.objName]
      return {
        ...state,
        [(action.rootPosition ? action.rootPosition : 'genericStructure')] : structure,
      }
    case MESSAGE_SUCCESS:
      return {
        ...state,
        mensagemSucesso: action.msg,
      }
    default:
      return state
  }
}