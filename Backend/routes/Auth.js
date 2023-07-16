const express = require('express');
const User = require('../models/User');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SEC = "inayathisagoodb$0y";
const fetchuser = require('../middleware/fetchuser');
const {
  body,
  validationResult
} = require('express-validator');
const user = require('../models/User');


//create a post request (/createuser),no login required


router.post('/createuser', [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('name').isLength({
    min: 5
  }),
], async (req, res) => {
  
  //checking for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {
    let user = await User.findOne({
      email: req.body.email
    })
    if (user) {
     success = false
      return res.status(400).json({
        errors: "email already exist"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //creating the user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    const data = {
      user: user.id
    }
    const authtoken = jwt.sign(data, JWT_SEC);
    success = true
    res.json({
   success,authtoken
    })
  } catch (error) {
    success = false
    console.log(error.message)
    return res.status(500).json("Internal server error")
  }

  // .then(user => res.json(user)).catch(err=>{
  //   console.log(err) 
  //   res.json({error:"Please enter a valid message",message : err.message})
  // })
})
//create a post request (/login),no login required
router.post('/login', [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').exists()
], async (req, res) => {
  let success = false;
  //checking for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {
    const {
      email,
      password
    } = req.body;
    let user = await User.findOne({
      email
    })
    if (!user) {
     success= false
      return res.status(400).json({
        errors: "Please login with correct credentials"
      })
    }
    const comparepassword = bcrypt.compare(password, user.password)
      if(!comparepassword){
        success = false
        return res.status(400).json({
          success,errors: "Please login with correct credentials"
        })
}
    const data = {
      user: {
        id:user.id
      }

    }
    const authtoken = jwt.sign(data, JWT_SEC);
    success = true
    res.json({
      success,authtoken
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json("Internal server error")
  }


})


//create a post request (/getuser), login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    
     userId = req.user.id
    console.log(userId)
    
    const user = await User.findById(userId).select("-password");
    
    res.send(user);

  } catch (error) {
   
    console.log(error.message)
    return res.status(401).json("Please use valid authentication")
  }

})
module.exports = router