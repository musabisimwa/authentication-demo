const express = require('express');
const {login,signup} = require('./user');
const {saveUser} = require('../services/userAuth');

const router = express.Router();

//endpoints

router.post('/u/signup',saveUser,signup);

router.post('/u/login',login);

//more endpoints here


module.exports =router;
