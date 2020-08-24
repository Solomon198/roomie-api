require('dotenv/config');
const Utils = require('../utills/utills');
const RequestStatus = require('../RequestStatus/status');
const model = require('../models');


module.exports.SignUp = async (req,res,next) =>{

    let {fullName,
        userName,
        email, 
        password,
        gender,
        age,
        course    
        } = req.body;
    
    try{

    //check if email exist
    const doesEmailExist = await Utils.EmailExist(email.toLowerCase());
    if(doesEmailExist.length > 0){
        return RequestStatus.ProcessingError(req,res,"Email already exists")
    }else{
           
            const user          =  new model.Users();
            user.fullName      =  fullName;
            user.userName       =  userName;
            user.userId         =  user._id;
            user.email          = email.toLowerCase();;
            user.age          = age;
            user.course     =  course;
            user.gender = gender;
   
           
            user.setpassword(password);
            
            
            await  user.save({validateBeforeSave:false},function(err,doc){
               if(err){
                  return RequestStatus.ProcessingError(req,res,err.message)
               }

               return RequestStatus.ProcessingSuccess(req,res,user);
           })
        
           
    }
    }catch(e){
       return RequestStatus.ProcessingError(req,res,e)
    }
    
}




