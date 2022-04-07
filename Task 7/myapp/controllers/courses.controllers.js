const Course = require('../models/coursemodel');
const  Bootcamp  = require('../models/bootcampmodel');
const asyncMiddleware = require('../Middleware/middleware');
const { customMiddleware } = require('../middleware/CustomMiddleware');

exports.getAllCourses = asyncMiddleware(async (req,res,next) => { //Function to read information of all courses 
let result = await customMiddleware(Course, { bootcamp: req.params.id }, { name: req.query.sortBy }, req.query,'bootcamp',next);
res.send(result);
});

  exports.getCourse = asyncMiddleware(async(req,res) => { //Function to read information of a course according to its id
    const course = await Course.findById(req.params.courseId).populate("bootcamp"); //find the record according to ID.
    if(!course || course.bootcamp._id != req.params.id) return res.send("The course with the given ID not found"); //if not found display am appropriate message
    res.send(course); //to displays the founded course information from courses array 
});

exports.postCourse = asyncMiddleware(async (req,res) => { //Function to create a new course.

  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
  console.log(bootcamp,req.params.id)
  if(!bootcamp) return res.send("The bootcamp with the given ID not found");
  
  let course = new Course({
    name: req.body.name,
    author: req.body.author,
    bootcamp: bootcamp.id,
    tags: req.body.tags,
    isPublished: req.body.isPublished
  }); 
  result = await course.save(); //save the new record 
  res.send(result); //to display the newly added record
});

exports.putCourse = asyncMiddleware(async (req,res) => { //Function to update an existing course.
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
  if(!bootcamp) return res.send("The bootcamp with the given ID not found");
  
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body ); //find the record according to id and update with the given query in body text.
  if(!course) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  
  const result = await course.save(); //save the record 
  res.send(result); //display the record

});

 exports.deleteCourse = asyncMiddleware( async (req,res) => { //Function to delete a function by ID.
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
  if(!bootcamp) return res.send("The bootcamp with the given ID not found");
  
  const result = await Course.findByIdAndRemove(req.params.courseId); //find the record according to id and remove
  if(!result) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  res.send(result); //display the deleted record
 });