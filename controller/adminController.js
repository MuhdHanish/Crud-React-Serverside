const adminCollection = require('../model/adminSchema')
const userCollection = require('../model/userSchema')

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
 login: async (req, res) => {
  const { email, password } = req.body
  const adminExist = await adminCollection.findOne({ email: email })
  try {
   if (adminExist) {
    const isMatch = adminExist.password === password
    if (isMatch) {
     const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1m' });
     res.status(200).json({ message: 'Login successful', token: token })
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
 getUsers: async (req, res) => {
  const users = await userCollection.find().toArray()
  try {
   if (users) {
    res.status(200).json({ message: 'Users fetched successfully', users: users })
   } else {
    res.status(400).json({ message: 'No users found' })
    return;
   }
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 },
 getUser: async (req, res) => {
  const userId = req.params.id;
  const user = await userCollection.findOne({ _id: new ObjectId(userId) })
  try {
   if (user) {
    res.status(200).json({ message: 'User fetched successfully', user: user })
   } else {
    res.status(400).json({ message: 'No user found' })
    return;
   }
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 },
 deleteUser: async (req, res) => {
  const userId = req.params.id;
  await userCollection.deleteOne({ _id: new ObjectId(userId) }, (err) => {
   if (err) {
    res.status(500).json({ message: "Error deleting user" });
    return;
   } else {
    res.status(200).json({ message: "User deleted successfully" });
   }
  });
 },
 addUser: async (req, res) => {
  const { username, email, password } = req.body
  const userExist = await userCollection.findOne({ email: email })
  try {
   if (userExist) {
    res.status(400).json({ message: 'Email is already registered' })
    return;
   } else {
    await userCollection.insertOne({
     username: username,
     email: email,
     password: password
    }).then(() => {
     const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: '1m' });
     res.status(200).json({ message: "User created successfully", token: token })
    })
   }
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 },
 editUser: async (req, res) => {
  const { id, username, email } = req.body;

  try {
   const existingUser = await userCollection.findOne({ _id: new ObjectId(id) });

   if (!existingUser) {
    res.status(404).json({ message: 'User not found' });
    return;
   }

   if (existingUser.email !== email) {
    const userWithEmail = await userCollection.findOne({ email: email });
    if (userWithEmail) {
     res.status(400).json({ message: 'Email is already registered' });
     return;
    }
   }

   await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { username: username, email: email } }
   ).then();

   res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
   res.status(500).json({ message: err.message });
  }
 }

}