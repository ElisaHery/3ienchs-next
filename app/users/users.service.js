'use strict';

var config = require('../helpers/config');
var jwt = require('jsonwebtoken');
var crypt = require('../helpers/crypt');
var db = require('../helpers/db');

module.exports = {
  authenticate,
  register,
  changeType,
};

function register(userParam, callback) {
  if (
    !userParam.lastname ||
    !userParam.firstname ||
    !userParam.email ||
    !userParam.password
  ) {
    return callback({
      success: false,
      message: 'Please enter firstname, lastname, email and password.',
    });
  } else {
    var newUser = {
      firstname: userParam.firstname,
      lastname: userParam.lastname,
      email: userParam.email,
      password: userParam.password,
    };

    // Attempt to save the user
    db.createUser(
      newUser,
      function (res) {
        return callback({
          success: true,
          message: 'Successfully created new user.',
        });
      },
      function (err) {
        return callback({
          success: false,
          message: 'That email address already exists.',
        });
      }
    );
  }
}

function authenticate({ email, password }, callback) {
  db.findUser(
    {
      email: email,
    },
    function (res) {
      var user = {
        user_id: res.user_id,
        user_email: res.email,
        is_active: res.is_active,
        user_type: res.admin,
      };

      // Check if password matches
      crypt.compareHash(password, res.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080, // in seconds
          });
          return callback({ success: true, token: token });
        } else {
          return callback({
            success: false,
            message: 'Mot de passe incorrect',
          });
        }
      });
    },
    function (err) {
      return callback({
        success: false,
        message: 'Adresse e-mail inconnue',
      });
    }
  );
}

function changeType(body, callback) {
  db.changeUserType(
    body.type,
    body.id,
    function () {
      return callback({
        success: true,
        message: 'Successfully updated user type.',
      });
    },
    function (err) {
      return callback({ success: false, message: 'The type update failed.' });
    }
  );
}
