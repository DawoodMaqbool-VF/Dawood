const Morgan = require('morgan');
const express = require('express');
const app = express();
const error = require('./Middleware/error');

app.use(express.json());
app.use(Morgan('tiny')); //Logger middleware that logs data for all endpoints.

const port = 8080; //defining listening port number

const getBootcamp = require('./routes/bootcamp');
app.use('/' , getBootcamp) ;
app.use(error);

app.listen(port, () =>{
  console.log("App is listening now"); //confirmation message
});
