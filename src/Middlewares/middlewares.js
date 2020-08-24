const  Utils =  require('../utills/utills');
const RequestStatus = require("../RequestStatus/status");

module.exports.isLogin = (req,res,next) =>{
 
    let decoded = Utils.decodeData(req.headers.authorization);
    
    if(!decoded || decoded instanceof Error){
  
      return  RequestStatus.UnAuthorized(req,res);

    }
   return  next();
}

module.exports.ValidateResourceExchange = (req,res,next) => {
   const isValid = Utils.decodeData(req.body.data);
   if(!isValid || isValid instanceof Error){
     return RequestStatus.UnAuthorized(req,res);
   }
   return next();
}