module.exports = function(err, req, res, next){ //middleware function for logging errors
    if (err.name == 'CastError' || err.name == 'Error') { //check if error is of type casterror or error
        res.status(404).send("Object not found"); //display 404 code with object not found
    } else {
        res.status(500).send("Internal Server Error"); //else display internal server error for all other kinds of errors.
    }
}