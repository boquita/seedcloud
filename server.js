var app = require('express').createServer();
var mongoose = require('mongoose');
var config = require ('./config');
var db = mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
  username : String,
  title    : String
});

var userModel = mongoose.model('User', UserSchema);
var user = new userModel();
user.username = 'Ivan';
user.title = 'Senior Developer';
user.save(function(err) {
  if (err) throw err;
  else {
    console.log('User saved, starting server...');
    app.listen (8888);
  }
});  
 

app.get(config.routes.find, function(req, res) {
   res.contentType('application/jsonn'); 
    userModel.findOne({'username': req.params.id}, function(err, user) {
      if (user != null) {
        console.log('Found the User:' + user.username);
        res.send(JSON.stringify(user));
      }
	else console.log ('no user found');
    });
});

