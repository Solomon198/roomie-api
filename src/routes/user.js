

const  Router =  require('express');
const loginController = require("../controllers/login");
const userController = require('../controllers/user')
const router = Router();

//need authorization to login

router.post("/login",loginController.login);
router.post("/saveInfo",userController.UpdateMatchStats)
router.post('/find-match',userController.FindMatch)
module.exports = router;