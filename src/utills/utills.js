const dotenv = require('dotenv/config');
const models = require('../models');


module.exports.EmailExist = async(email)=>(
    await Promise.all([
        
        models.Users.findOne({email:email}),
    ])
).filter((user)=> user != null);
