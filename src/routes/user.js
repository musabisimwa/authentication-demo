const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const {
  userSignUpValidator,
  userLoginValidator,
} = require("../utils/validators");

//globals
const User = db.users;

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * create a new user
 */
const signup = async (req, res) => {
  try {
    // if any body arg is missing/invalid return a 400 bad req
    if (!userSignUpValidator(req.body)) {
      // we dont need to specify the reason why hence a generic response
      return res.json(400).send({ msg: "Bad request" });
    }

    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    //save
    const user = await User.create(data);

    //generate a token when creation is successful
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      //debug
      console.log({
        user: JSON.stringify(user, null, 2),
        token,
      });
    } else {
      return res
        .status(412)
        .send({ msg: "Precondition failed : user was not created" });
    }
  } catch (err) {
    // any err like this is def a 500

    // we'll log whatever err is there
    console.log(err);
    const errMsg = err.message
      ? err.message
      : "An internal server error occured";
    res.status(500).send({ msg: "internal server error : " + errMsg });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * auth the user
 * @returns a http.response type
 */
const login = async (req, res) => {
  if (!userLoginValidator(req.body)) {
    return res.json(400).send({ msg: "Bad request" });
  }
  try {
    const { email, password } = req.body;

    const user = User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json(401).send({ msg: "username/password is incorrect" });
    }
    const sameuser = await bcrypt.compare(password, user.password);
    // passwords do not match
    if (!sameuser) {
      return res.json(401).send({ msg: "username/password is incorrect" });
    }
    // generate a new token

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
    //log the email ,token
    console.log({
      user: user.email,
      token: token,
    });
    // send no body
    return res.status(200).send({});
  } catch (error) {
    console.log(err);
    const errMsg = err.message
      ? err.message
      : "An internal server error occured";
    res.status(500).send({ msg: "internal server error : " + errMsg });
  }
};

module.exports ={login,signup};
