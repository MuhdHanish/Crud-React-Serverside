const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
 .then(() => console.log("Database connected..."))
 .catch((err)=>{
 console.log(err)
})