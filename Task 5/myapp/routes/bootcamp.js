const express = require('express');
const router = express.Router(); //setting up express router

//All CRUD endpoints

const getController = require('../controllers/bootcamp.controllers')
router.get("/api/courses", getController.getAll_Func); //to read information of all courses
router.get("/api/courses/:id", getController.get_Func); //to read information of spicific course according to id
router.post("/api/courses", getController.post_Func); //to create a new course
router.put("/api/courses/:id", getController.put_Func); //to update a course information according to its id
router.delete("/api/courses/:id", getController.delete_Func); //to delete a course according to its id

router.get("*", (req,res) =>{ 
    return res.status(404).send("The given path is not correct"); //to display a relevant response if the given url is not correct
});

module.exports  = router;