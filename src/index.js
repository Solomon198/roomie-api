require('dotenv/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const routes = require('./routes/');

require("../src/utills/connection");






// Application-Level Middleware    
const middlewares = require("./Middlewares/middlewares");
const {ValidateResourceExchange} = middlewares;
const app = express();
app.use(cors());
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug');
app.set('views', './views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
// Routes
app.use('/v1/login',routes.login); 
app.use('/v1/signup',routes.SignUp);
app.use("/v1/user",routes.User);


// Testing purpose => chrome port forwarding to device
app.use('/v1',(req,res,next)=>{

  res.status(200).json({status:200,message:"Welcome to Roomie"})
})


// Start
let PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`API listening on port ${PORT}!`),
);
