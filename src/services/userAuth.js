// replace console.error /logs by dedicated logging modules


const db = require('../models');
const { userValidator } = require('../utils/validators');
const jwt =require('jsonwebtoken');

const User = db.users;

/**
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next middleware function
 *
 * Check if a user already exists by username or email to avoid duplicates.
 */
const saveUser = async (req, res, next) => {
  try {
    if (!userValidator(req.body)) {
      return res.status(400).json({ msg: "Bad request" });
    }

    const userName = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (userName) {
      // Return a 409 conflict
      return res.status(409).json({ msg: `Username ${req.body.userName} is already taken` });
    }

    // Check for email duplicates
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).json({ msg: "This email already exists" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


/**
 * middleware to verify if the user is authorized to perform an action
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkOwnership =(req,res,next) =>{
// get the coookie named jwt that was created when login/signup action
const token = req.cookies.jwt;

if(!token){
  // no token found ,un authorized acess
  return res.status(401).json({msg:"unauthorized action"});
}
// decode the token to get the user
jwt.verify(token,process.env.SECRET_KEY,
  (err,decoded)=>{
    if(err){
      //error while decoding token
      console.error(err);
      return res.status(401).json({msg:"unauthorized action"});
    }
    //if success : user should be decripted
    //send this to receivers that will use user verification before performing an action :next()
    req.user =decoded;

    
});
next();

}
module.exports = { saveUser ,checkOwnership};
