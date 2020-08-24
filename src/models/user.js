"use strict";

const mongoose = require("mongoose");
const crypto       = require("crypto");

const Users = new mongoose.Schema({

   
    userId              :  mongoose.Schema.Types.String,
    fullName           :  {type:mongoose.Schema.Types.String},
    userName            :  {type:mongoose.Schema.Types.String},
    hash                :  mongoose.Schema.Types.String,
    salt                :  mongoose.Schema.Types.String,
    email               :  {type:mongoose.Schema.Types.String,default:String},
    gender              :  {type:mongoose.Schema.Types.String},
    age                 :  {type:mongoose.Schema.Types.String},
    course              :  {type:mongoose.Schema.Types.String},
    scale               : {types:mongoose.Schema.Types.Number},
    questions             : [{
                             
                                 answer: {type:mongoose.Schema.Types.Number},
                                 howAnswer: {type:mongoose.Schema.Types.Number},
                                 score:{type:mongoose.Schema.Types.Number}
                            
                          }]

},{autoIndex:false})

 
Users.methods.isVerified = function(){
    return this.verified;
}

Users.methods.setpassword = function(password){
    this.salt   = crypto.randomBytes(16).toString('hex');
    this.hash   = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
}

Users.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString("hex");
    return hash === this.hash;
} 



module.exports = mongoose.model("Users",Users);



