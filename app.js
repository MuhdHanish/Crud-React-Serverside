const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./config/connection');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(8000, () => console.log('Server Started...'));
