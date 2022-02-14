export const implementedRoutes = [
  'users', 'users/signin', 
  'projects', 'projects/user',
  'tasks', 'tasks/project', 'tasks/done/project', 'tasks/done'
]
export const defineUrl = (method, group, id = -1, filter = {}, complementaryKey) => {
  //////////////////////////////////////////////////////////  
  //// Todas as rotas que o app conhecer de forma genérica
  //   devem ser inseridas no array [implementedRoutes] (acima):  
  /////////////////////////////////////////////////////////////////////////////////////////  
  group = group !== null && typeof group === 'object' && group.route ? group.route : group
  if (implementedRoutes.indexOf(group) < 0) {
    // eslint-disable-next-line no-throw-literal
    throw `Route [ ${group} ] not implemented yet.`
  }
  /////////////////////////////////////////////////////////////////////////////////////////  
  //
  ///////////////
  let url = group
  ///////////////
  //
  //////////////////
  //#region GET
  //
  if (method.toUpperCase() === 'GET') {
    switch (group) {
      case 'projects/user':
        if (filter && filter.userId)
          url += `/${String(filter.userId)}`
        break
      case 'tasks/project':
      case 'tasks/done/project':
        if (filter && filter.projectId)
          url += `/${String(filter.projectId)}`
        break
      case 'users':
        url = id < 0 ? group : group + '/' + String(id)
        break
      default:
        break
    }
    return url
  }
  //#endregion
  //////////////////
  //
  /////
  //
  //////////////////
  //#region POST
  if (method.toUpperCase() === 'POST') {
    switch (group) {
      default:
        break
    }
    return url
  }
  //#endregion
  //////////////////
  //
  /////
  //
  //////////////////
  //#region PATCH
  if (method.toUpperCase() === 'PATCH') {
    switch (group) {
      case 'tasks/done':
        url = group + '/' + String(id)
        break
      default:
        break
    }
    return url
  }
  //#endregion
  //////////////////
  //
  /////
  //
  //////////////////
  //#region DELETE
  //
  if (method.toUpperCase() === 'DELETE') {    
    switch (group) {
      case 'projects':
      case 'tasks':
        url = group + '/' + String(id)
        break
      default:
        url = group
        break
    }
    return url
  }
  //#endregion
  //////////////////
  //
  return url
}