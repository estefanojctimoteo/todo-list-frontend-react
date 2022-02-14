export function loadDataFromMainReg(fields, dataMainReg){
  let arrRetorno = []
  fields.forEach(field => {
    arrRetorno.push(
      dataMainReg[field.key.replace('_','')] !== undefined && dataMainReg[field.key.replace('_','')] !== null ? 
      String(dataMainReg[field.key.replace('_','')]).toLowerCase()==='false' ? false :
      dataMainReg[field.key.replace('_','')] : field.defaultValue)
  });
  return [...arrRetorno]
}