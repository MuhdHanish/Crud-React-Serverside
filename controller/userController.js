
const userCollection = require('../model/userSchema');


const bcrypt = require('bcryptjs')

module.exports = {
  signUp: async (req, res) => {
  const {username,email,password} = req.body
  const userExist = await userCollection.findOne({email:email})
  try{
   if(userExist){
    res.status(400).json({message:'Email is already registered'})
   }else{
    const hashPassword = await bcrypt.hash(password,12)
    await userCollection.insertOne({
     username:username,
     email:email,
     password:hashPassword
    }).then(()=>{
     res.status(200).json({message:"User created successfully"})
    })
   }
  }catch(err){
   res.status(500).json({ message: err.message });
  }
 }
}
