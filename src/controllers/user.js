
const mongoose = require('mongoose');
const RequestStatus = require('../RequestStatus/status');
const user = require('../models').Users;
const utils = require('../utills/utills');
const { Users } = require('../models');



module.exports.UpdateMatchStats = async (req,res,next) =>{

   try{

        const payload = req.body;



        let doc = await Users.findOneAndUpdate({userId:payload.user},payload);

        RequestStatus.ProcessingSuccess(req,res,doc)
            
       
   }catch(e){

     return RequestStatus.ProcessingError(req,res,e.message)
     
   }
}


module.exports.FindMatch = async (req,res,next) =>{

    try{
 
         const payload = req.body;
 
        let document = await Users.find({});
        let foundMatch = [];

        //step one find my account
        let myAccount = {};
        document.forEach((user,index)=>{
            if(user.userId == payload.userId){
                myAccount = user;
            }
        })

        //compute match
        document.forEach(($user,perUser)=>{

            let percentage1;
            let percentage2;

            
            let nthRoot;

            if($user.userId != payload.userId){
                
               if($user.scale){
                let mrBscore = 0;
                let myScore = 0;

               //how much does Mr B satisfy me
               myAccount.questions.forEach((question,index)=>{
                  if(question.howAnswer == $user.questions[index].answer){
                      mrBscore += question.score;
                  }
               })


               //how  much do i satisfy Mr B;
               $user.questions.forEach((question,index)=>{
                   if(question.howAnswer == myAccount.questions[index].answer){
                       myScore += question.score;
                   }
               })

                 percentage1 = (mrBscore/myAccount.scale) * 100;
                 percentage2 = (myScore/$user.scale) * 100;

                 console.log(percentage1,percentage2)

                 nthRoot = Math.sqrt(percentage1*percentage2);
                 if(nthRoot >= 50){
                     foundMatch.push({user:$user,percentageMatch:nthRoot})
                 }


                 

               }
            }

             
            

            
        })


       
 
         RequestStatus.ProcessingSuccess(req,res,foundMatch)
             
        
    }catch(e){
 
      return RequestStatus.ProcessingError(req,res,e.message)
      
    }
 }
 





