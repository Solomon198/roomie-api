
const  Utils = require('../utills/utills.js');


//LOGIN STATUS
module.exports.LoginSuccess = (req,res,next,userId,user)=>{
    res.json({status:"Success",message:"LOGIN SUCCESS",token:Utils.encodeData({userId}),user:user});
    next();
}

module.exports.LoginFailure = (req,res,next)=>{
    res.json({status:"Failure",message:"EMAIL DOES NOT EXIST"});
}

module.exports.IncorrectPassword = (req,res)=>{
    res.json({status:"Failure",message:"INCORRECT PASSWORD AUTH FAILED"});
}

//SIGN UP STATUS
module.exports.SignUpSuccess = (req,res,next,userId)=>{
    res.json({status:"Success",message:"SIGNUP SUCCESS",token:Utils.encodeData({userId})})
    next();
}

module.exports.SignUpFailure = (req,res,next)=>{
    res.json({status:"Failure",message:"EMAIL ALREADY EXIST",token:""})
}

//VALIDATING INPUT
module.exports.InvalidInputs = (req,res)=>{
    res.json({status:"Failure",message:"ERROR PROCESSING. INVALID INPUT",})
}

//PROCESSING ERROR
module.exports.ProcessingError = (req,res,err) =>{
    res.json({status:"Failure",message:err})
}

//PROCESSING SUCCESS 
module.exports.ProcessingSuccess = (req,res,data) =>{
    res.json({message:"",data,status:"Success"});
}
//AUTH   


module.exports.UnAuthorized = (req,res)=>{
      res.json({message:"UNAUTHORIZED REQUEST",status:"Failure"}) 
}

