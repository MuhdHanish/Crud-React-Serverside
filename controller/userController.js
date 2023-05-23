
const userCollection = require('../model/userSchema');

const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


module.exports = {
 signUp: async (req, res) => {
  const { username, email, password } = req.body
  const userExist = await userCollection.findOne({ email: email })
  try {
   if (userExist) {
    res.status(400).json({ message: 'Email is already registered' })
    return;
   } else {
    const hashPassword = await bcrypt.hash(password, 12)
    await userCollection.insertOne({
     username: username,
     email: email,
     password: hashPassword,
     image: ''
    }).then((data) => {
     const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1m' });
     res.status(200).json({
      user: {
       id: data.insertedId,
       username: username,
       email: email,
       image: null
      }, message: "User created successfully", token: token
     })
    })
   }
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 },
 login: async (req, res) => {
  const { email, password } = req.body
  const userExist = await userCollection.findOne({ email: email })
  try {
   if (userExist) {
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (isMatch) {
     const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1m' });
     res.status(200).json({
      user: {
       id: userExist._id,
       username: userExist.username,
       email: userExist.email,
       image: userExist.image
      },
      message: 'Login successful', token: token
     })
    } else {
     res.status(400).json({ message: 'Invalid Password' })
     return;
    }
   } else {
    res.status(400).json({ message: 'Invalid Email' })
    return;
   }
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 },
 imageUpload: async (req, res) => {
  try {
   const { userId } = req.body;
   const imgUrl = req.file.filename;
   await userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { image: imgUrl } }).then()
    res.status(200).json({ success: true, imageUrl: imgUrl });
  } catch (err) {
   console.error(err);
   res.status(500).json({ success: false, error: 'Failed to update image URL' });
  }

 }
}
