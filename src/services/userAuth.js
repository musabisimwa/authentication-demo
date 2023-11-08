const db = require('../models');
const { userValidator } = require('../utils/validators');

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

module.exports = { saveUser };
