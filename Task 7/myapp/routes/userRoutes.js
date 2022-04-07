const express = require('express');
const getBootcamp = require('./bootcampRoutes');
const router = express.Router();


const userController = require('../controllers/users.controllers');
const { verifyToken } = require('../Middleware/auth');
router.post("/api/auth/signup", userController.signup_Func); //to create a new course
router.post("/api/auth/login", userController.login_Func);
router.use("/api/bootcamp",verifyToken,  getBootcamp);
router.get("*", (req,res) =>{ 
    return res.status(404).send("The given path is not correct"); //to display a relevant response if the given url is not correct
});

module.exports  = router;