export function isNumeric(n) {   
  return !isNaN(parseFloat(n)) && isFinite(n); 
}

export function createRandomString(strLength) {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false
  if(strLength){
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'

    var str = '';
    for(let i = 1; i <= strLength; i++) {
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str+=randomCharacter
    }
    return str
  } else {
    return ''
  }
}

export function defineErrorMsg(e){
  e = Object.assign({}, e)  
  let retorno = ''
  if (e.response && e.response.status && e.response.status===400 && e.response.data && e.response.data.errors){
    let msgErro = ''
    if (Array.isArray(e.response.data.errors)){
      e.response.data.errors.map(erro => {
        msgErro += msgErro !== '' ? ' ' : ''
        msgErro += erro
      })
    } else {
      msgErro = e.response.data.errors
    }
    retorno = msgErro
  }
  else
  if (e.response && e.response.status && e.response.status === 403) {
    retorno = 'Access denied!'
  }
  else
  if (e.response && e.response.errors) {
    retorno = Array.isArray(e.response.errors) ? e.response.errors[0] : e.response.errors
  }
  else
  if (e.message) {
    retorno = e.message
  }
  else {
    let code = (e.response && e.response.status && e.response.status > 0) ? e.response.status : -1
    if (code > 0 && e.response.statusText) {
      retorno = JSON.stringify(code) + ' - ' + e.response.statusText
    }
    else {
      if (code === -1)
        retorno = 'We couldn\'t obtain any response'
      else
        retorno = JSON.stringify(e)
    }
  }
  return retorno
}

export function onlyUnique(value, index, self) { 
  return self.indexOf(value === index);
}

export function getUniqueValuesOfKey(array, key){
  return array.reduce(function(carry, item){
    if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
    return carry;
  }, []);
}

export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
     return match
  });
}

export function tokenIsValid(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000)
  return (new Date()) < date
}
