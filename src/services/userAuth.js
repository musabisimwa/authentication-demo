const express =require('express');
const db = require('../models');


const User = db.users;


/**
 * 
 * @param {*} req  Req type
 * @param {*} res  Res type
 * @param {*} next 
 * 
 * if uname already exists? avoid duplicates
 */
const saveUser= async(req,res,next)=>{
    try {
        const userName = await User.findOne({
            where:{
                userName: req.body.userName
            },
        });
        if(userName){
            // return a 409 conflict
            return res.json(409).send({msg:`username ${userName} is already taken`});
        }
        //email?
        const email = await User.findOne({
            where:{
                email: req.body.email,
            }
        });
        if(email){
            return res.json(409).send({msg:"This email already exists"})
        }
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports ={saveUser};
