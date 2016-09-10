import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var apiRouter = express.Router()

var Schema = mongoose.Schema;

// set up a mongoose model
var User = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean
}));

const saltRounds = 10;

let myLocation = {
  name: "Mmarcl",
  id: 1,
  lat: 0.0,
  lng: 0.0
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// Insecured API
apiRouter.get('/setup', function(req, res) {
  bcrypt.hash(config.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    // create a sample user
    var mmarcl = new User({
      name: config.username,
      password: hash,
      admin: true
    });
    mmarcl.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.json({
        success: true
      });
    });
  });
});
apiRouter.get('/myLocation', function(req, res, next) {
  res.json(myLocation);
});
apiRouter.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      bcrypt.compare(req.body.password, user.password, function(err, cmpRes) {
        if (cmpRes) {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } else {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});
// Middleware
apiRouter.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }

});
// Secured API
apiRouter.post('/setLocation', function(req, res, next) {
  var newLocation = req.body;
  console.log('client ip:' + req.headers.host)
  console.log('user-agent:' + req.headers['user-agent'])
  console.log('get new location' + newLocation)
  if ('lat' in newLocation && 'lng' in newLocation) {
    let lat = parseFloat(newLocation.lat)
    let lng = parseFloat(newLocation.lng)
    if (isNumber(lat) && isNumber(lng) && lat >= 0.0 && lng >= 0.0) {
      Object.assign(myLocation, {
        lat: lat,
        lng: lng
      })
      res.json({
        status: 'OK'
      });
    } else {
      res.status(500).json({
        error: 'Numeric conversion failed'
      });
    }
  } else {
    res.status(500).json({
      error: 'Wrong body format'
    });
  }


});
export default apiRouter
