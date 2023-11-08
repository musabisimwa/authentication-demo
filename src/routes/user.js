const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const {userLoginValidator,userSignUpValidator} = require('../utils/validators')
// Globals
const User = db.users;

/**
 * @param {*} req Request object
 * @param {*} res Response object
 *
 * Create a new user.
 */
const signup = async (req, res) => {
  try {
    // If any body argument is missing/invalid, return a 400 bad request.
    if (!userSignUpValidator(req.body)) {
      return res.status(400).json({ msg: "Bad request" });
    }

    const { userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
      console.log({
        user: JSON.stringify(user, null, 2),
        token,
      });
    } else {
      return res.status(412).json({ msg: "Precondition failed: user was not created" });
    }
  } catch (err) {
    console.error(err);
    const errMsg = err.message || "An internal server error occurred";
    res.status(500).json({ msg: "Internal server error: " + errMsg });
  }
};

/**
 * @param {*} req Request object
 * @param {*} res Response object
 *
 * Authenticate the user and return an HTTP response.
 */
const login = async (req, res) => {
  if (!userLoginValidator(req.body)) {
    return res.status(400).json({ msg: "Bad request" });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "Username/password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Username/password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
    console.log({
      user: user.email,
      token: token,
    });

    return res.status(200).send({msg:"logged in as " + user.email});
  } catch (err) {
    console.error(err);
    const errMsg = err.message || "An internal server error occurred";
    res.status(500).json({ msg: "Internal server error: " + errMsg });
  }
};

module.exports = { login, signup };
