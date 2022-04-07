 const User = require('../models/usermodel');
const asyncMiddleware = require('../Middleware/middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signup_Func = asyncMiddleware(async (req,res) => { //Function to create a new course.
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);

    let result = await user.save(); //save the new record 
 

    res.send(result); //to display the newly added record
  });


exports.login_Func = asyncMiddleware(async (req,res) => {
      let user = await User.findOne({ email: req.body.email });
      if(!user) return res.status(400).send('Invalid email or password.');

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if(!validPassword) return res.status(400).send('Invalid email or password.');

      jwt.sign({user}, 'jwtprivatekey', (err, token) => {
        res.json({user,token});
      });
    

  
  });

  