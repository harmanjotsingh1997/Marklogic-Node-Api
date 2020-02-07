const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

//Database connection

// const marklogic = require('marklogic');
// const my = require('./config/env').connection;
// const db = marklogic.createDatabaseClient(my);
// const q = marklogic.queryBuilder;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var routes = require('./routes/home');
app.use('/',routes);
// Make ML db accessible to our router
app.use(function(req, res, next){
    req.db = db;
    next();
  });
  
  // Make ML queryBuilder accessible to our router
  app.use(function(req, res, next){
    req.q = q;
    next();
  });

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
