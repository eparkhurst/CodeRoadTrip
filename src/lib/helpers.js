
const helperObj ={}

helperObj.createObjById = function(arr){
  return arr.reduce((p,c)=>{
    p[c.id] = c
    return p
  },{})
}

export default helperObj
