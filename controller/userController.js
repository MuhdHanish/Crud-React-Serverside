const mongoose  = require('mongoose');
require('../model/userSchema')
const userCollection = mongoose.model('users')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const JWT_KEY = 'KEY'

module.exports = {

 getHome:async(req,res)=>{
  res.send('Home Page')
 },
 
};

