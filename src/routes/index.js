const express = require('express');
const {login,signup} = require('./user');
const {saveUser,checkOwnership} = require('../services/userAuth');
const minerRoutes = require('./miners');
const router = express.Router();

//endpoints

router.post('/u/signup',saveUser,signup);

router.post('/u/login',login);

router.put('/miner/:id',checkOwnership,minerRoutes.update);
router.get('/miner/:id',minerRoutes.getOne);
router.get('/miner',minerRoutes.getAll);
router.post('/miner',checkOwnership,minerRoutes.post);
router.delete('/miner',checkOwnership,minerRoutes.deleteAMiner);

//more endpoints here


module.exports =router;
