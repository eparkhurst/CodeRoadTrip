
const helperObj ={}

helperObj.createObjById = function(arr){
  return arr.reduce((p,c)=>{
    p[c.id] = c
    return p
  },{})
}
helperObj.orderObject = function(obj){
  return obj.sort((a,b)=>{
    if(a.id == null) a.id = 0
    return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0));
  })
}
helperObj.createLocationArray = function(obj){
  return obj.filter((e)=>{
    return e.location
  }).map((e)=>{
    return e.location
  })
}

export default helperObj
