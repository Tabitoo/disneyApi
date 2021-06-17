var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var charactersRouter = require('./routes/characters');
var genresRouter = require("./routes/genres");
var moviesRouter = require("./routes/movies");
var relationsRouter = require("./routes/relations");
var usersRouter = require("./routes/users");
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', usersRouter)
app.use('/api/characters', charactersRouter);
app.use('/api/genres',genresRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/relations',relationsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  /*
  res.status(err.status || 500);
  res.render('error');
  */
});

module.exports = app;
