var express = require('express');
var router = express.Router();
const marklogic = require('marklogic');
const my = require('../config/env').connection;
const db = marklogic.createDatabaseClient(my);
const q = marklogic.queryBuilder;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MarkLogic' });
});

router.post('/add', function(req, res, next) {
  console.log("entered this");
  var  name = req.body.name;
  var gender = req.body.gender;
  var age = req.body.age;  
  console.log(name+gender+age);
  db.documents.write({
        uri: '/' + name + '.json',
        contentType: 'application/json',
        content: {
          name: name,
          gender: gender,
          age: age
        }
      }).
      result(function(err, result){
        res.send(
          (err === null) ? {msg: 'entity added succesfully'} : {msg: err }
                 );
          console.log("entered db");
      });
  
});


var url = require('url');
router.get("/search",function(req,res,next)
{
  console.log ("search entered");
  var parts = url.parse(req.url, true);
  var query = parts.query;
  console.log(query);
db.documents.query( q.where(
  q.byExample( query ))
). result(function(records){
    res.json(records);
  });
 
})

router.post('/delete', function(req, res, next) {
 
console.log("entered delete");
  var entityToRemove = req.body.name;
  console.log(entityToRemove);
  var uri = '/' + entityToRemove + '.json';
  console.log(uri); 
console.log(entityToRemove+"///"+uri);
  db.documents.remove(uri).
  result(function(err, result){
    res.send(
      (err === null) ? {msg: 'Entity Removed Successfully' } : {msg: err }
    );
  });
});




module.exports = router;
