const express = require('express');



const cookieParser = require('cookie-parser');

const logger = require('morgan');

// eslint-disable-next-line import/no-unresolved, import/extensions


const usersRouter = require('./routes/users');

const filmsRouter=require('./routes/films');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const stats={};

app.use((req, res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  stats[currentOperation] += 1;
  
  next();
});
  

app.use('/users', usersRouter);
app.use('/films',filmsRouter);

module.exports = app;
