
const  Router  =  require('express');
const signUpController =  require('../controllers/signUp')
const router = Router();

router.post('/',signUpController.SignUp);

module.exports =  router;