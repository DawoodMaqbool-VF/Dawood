const Course = require('../index');
const asyncMiddleware = require('../Middleware/middleware');



exports.getAll_Func = asyncMiddleware(async (req,res) => { //Function to read information of all courses 
    const courses = await Course.find().sort('name'); //find and sort all records according to name.
    res.send(courses); //to display the sorted records.
});

  exports.get_Func = asyncMiddleware(async(req,res) => { //Function to read information of a course according to its id
    const course = await Course.findById(req.params.id); //find the record according to ID.
    if(!course) return res.send("The course with the given ID not found"); //if not found display am appropriate message
    res.send(course); //to displays the founded course information from courses array 
});

exports.post_Func = asyncMiddleware(async (req,res) => { //Function to create a new course.

  const course = new Course(req.body); 
  const result = await course.save(); //save the new record 
  res.send(result); //to display the newly added record
});

exports.put_Func = asyncMiddleware(async (req,res) => { //Function to update an existing course.
  const course = await Course.findByIdAndUpdate(req.params.id, req.body ); //find the record according to id and update with the given query in body text.
  if(!course) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  
  const result = await course.save(); //save the record 
  res.send(result); //display the record

});

 exports.delete_Func = asyncMiddleware( async (req,res) => { //Function to delete a function by ID.
  const result = await Course.findByIdAndRemove(req.params.id); //find the record according to id and remove
  if(!result) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  res.send(result); //display the deleted record
 });