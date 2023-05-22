const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
   type:String,
   required:true
  },
  email:{
   type:String,
   required:true
  },
  password: {
   type:String,
   required:true
  },
  image:{
   type:String
  },
});

const userCollection = mongoose.model('users', userSchema).collection

module.exports = userCollection;
