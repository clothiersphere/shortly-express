var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(model.get('password'), salt, null, function(err, hash) {
          if (err) {
            console.log(err);
          } else {
            model.set('password', hash);
          }
        });
      });
    });
  }
});

module.exports = User;
