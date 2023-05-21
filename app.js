const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const logger = require('morgan');
app.use(logger('dev'));

const db = require('./config/connection')

const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(8000, () => console.log('Server Strarted...'))

const cors = require('cors')
app.use(cors({
 origin: ['http://http://localhost:8000'],
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 optionsSuccessStatus: 200
}));
