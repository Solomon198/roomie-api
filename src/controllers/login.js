
const mongoose = require('mongoose');
const RequestStatus = require('../RequestStatus/status');
const user = require('../models').Users;
const utils = require('../utills/utills');
const { Users } = require('../models');



module.exports.login = async (req,res,next) =>{

   try{

        const {email,password} = req.body;


        const searchUser = await utils.EmailExist(email.toLowerCase());

        if(searchUser.length == 1){
       
             return RequestStatus.ProcessingSuccess(req,res,searchUser[0]);
               
               if(searchUser[0].validatePassword(password)){
                
                  return RequestStatus.ProcessingSuccess(req,res,searchUser[0]);

               }else{

                  return RequestStatus.ProcessingError(req,res,"Incorrect Password please check the password and retry.")

               }
           
        }else{

            return RequestStatus.ProcessingError(req,res,"Email address does not exist");

        }
       
   }catch(e){

     return RequestStatus.ProcessingError(req,res,e.message)
     
   }
}





