const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRoutes = require('../buyDream/routes/userRoutes');
const viewRoutes = require('../buyDream/routes/viewRoutes');

const Building = require('../buyDream/models/buildingsModel');
const AppError = require('../buyDream/utils/app-error');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true ,
}).then(() => console.log("DB connection successfull"));

app.use('/', viewRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //if err is passed as argument in next() then it will ignore all other middlewares and direct go to error middleware.
});

// Error Middleware :-
app.use(errorController.globalErrorHandler);

module.exports = app;