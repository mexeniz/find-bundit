import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'

mongoose.Promise = require('bluebird');

var apiRouter = express.Router()

var Schema = mongoose.Schema;

// set up a mongoose model
var User = mongoose.model('User', new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  // name: {type: String, unique: true, required: true},
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  phoneNumber: String,
  email: String,
  lat: {
    type: Number,
    min: 0.0,
    default: 0.0
  },
  lng: {
    type: Number,
    min: 0.0,
    default: 0.0
  },
  friendList: [{
    type: 'String'
  }],
  profilePicture: String,
}, {
  timestamps: true
}));

const publicUserProfile = user => {
  return {
    username: user.username,
    // name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    picture: user.profilePicture,
  }
}

const insecuredPublicUserProfile = user => {
  return {
    username: user.username,
    // name: user.name,
    picture: user.profilePicture,
  }
}
const saltRounds = 10;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

function GetUserByUsername(username) {
  return User
    .findOne({
      username
    })
    .then(user => {
      if (!user) throw `User: ${username} not found`;
      // found user
      return Promise.resolve(user);
    });
}

function GetUserByToken(token) {
  const decoded = jwtDecode(token);
  const username = decoded.username;
  return GetUserByUsername(username);
}

// Insecured API
apiRouter.post('/register', function(req, res) {
  console.log(JSON.stringify(req.body));
  if (!('username' in req.body) || !('password' in req.body)) {
    res.json({
      success: false,
      message: 'Bad request format'
    });
  } else {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      // create a sample user
      var user = new User({
        username: req.body.username,
        password: hash,
        friendList: [],
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        // profilePicture: req.body('/image/'+req.body.username+'.jpg'),
        profilePicture: req.body.profilePicture,
      });
      user.save(function(err) {
        if (err) {

        	// if duplicate, print nicer message.
        	if (err.code === 11000) {
        		res.status(500).json({
        			success: false,
        			message: `Username '${req.body.username}' is already taken.`
        		})
        	} else {
        		// unknown error
	          res.status(500).json({
	            success: false,
	            message: err.message
	          });
	          throw err;
        	}
        }


        var token = jwt.sign({
          username: user.username
        }, config.secret, {
          expiresIn: '24h' // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      });
    });
  }

});
apiRouter.get('/getFriendLocation/:username', function(req, res, next) {
  var username = req.params.username;
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      res.status(500).json({
        success: false,
        message: err
      });
      throw err;
    }
    if (!user) {
      res.json({
        success: false,
        message: ('Not found user with username = ' + username)
      });
    } else if (user) {
      res.json({
        success: true,
        message: ('Successfully get user\'s location username=' + username),
        lat: user.lat,
        lng: user.lng,
        isActive: user.isActive,
        updatedAt: user.updatedAt
      });
    }
  });
});
apiRouter.post('/login', function(req, res) {
  // find the user
  console.log(req.body);
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) {
      res.status(500).json({
        success: false,
        message: err
      });
      throw err;
    }

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
          var token = jwt.sign({
            username: user.username
          }, config.secret, {
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
apiRouter.get('/getUserProfile/:username', function(req, res) {
    const username = req.params.username;

    if (!username) {
      res.status(500).json({
        error: 'Wrong body format'
      });
      return;
    }

    GetUserByUsername(username)
      .then(user => {
        res.status(200).json({
          success: true,
          message: 'Successfully get user profile',
          profile: insecuredPublicUserProfile(user),
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err,
        })
      })
  })
  // Middleware
apiRouter.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.query.token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err
        });
        throw err;
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
apiRouter.post('/updateMyLocation', function(req, res) {
  var newLocation = req.body;
  var token = req.body.token;
  var decoded = jwtDecode(token);
  var username = decoded.username;
  console.log("token username=" + username);
  console.log('client ip:' + req.headers.host);
  console.log('user-agent:' + req.headers['user-agent'])
  console.log('get new location')
  console.log(newLocation)
  if ('lat' in newLocation && 'lng' in newLocation) {
    let lat = parseFloat(newLocation.lat)
    let lng = parseFloat(newLocation.lng)
    if (isNumber(lat) && isNumber(lng) && lat >= 0.0 && lng >= 0.0) {
      // Object.assign(myLocation, {
      //   lat: lat,
      //   lng: lng
      // })
      // TODO: save to db here
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
          throw err;
        } else {
          if (!user) {
            res.json({
              status: 'Failed',
              message: 'Not found username=' + username
            });
          } else {
            user.lat = lat;
            user.lng = lng;
            user.save(function(err, user_res) {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: err
                });
                throw err;
              }
              if (!user_res) {
                return res.end('No such user');
              } else {
                res.json({
                  success: true,
                  username: user_res.username,
                  updatedAt: user_res.updatedAt,
                  lat: user_res.lat,
                  lng: user_res.lng
                });
              }
            });
          }
        }
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Numeric conversion failed'
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'Wrong body format'
    });
  }
});
apiRouter.post('/updateMyActive', function(req, res) {
  var token = req.body.token;
  var decoded = jwtDecode(token);
  var username = decoded.username;
  if ('isActive' in req.body) {
    var isActive = req.body.isActive;
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err
        });
        throw err;
      } else {
        if (!user) {
          res.json({
            status: 'Failed',
            message: 'Not found username=' + username
          });
        } else {
          user.isActive = isActive;
          // IDEA: update isAcive must not affect last update
          user.updatedAt = user.updatedAt;
          user.save(function(err, user_res) {
            if (err) {
              res.status(500).send('Internal Server Error');
              throw err;
            }
            if (!user_res) {
              return res.end('No such user');
            } else {
              res.json({
                status: 'OK',
                username: user_res.username,
                isActive: user_res.isActive,
              });
            }
          });
        }
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Wrong body format'
    });
  }
});
apiRouter.post('/updateProfilePicture', function(req, res) {
  var token = req.body.token;
  var decoded = jwtDecode(token);
  var username = decoded.username;
  if ('profilePicture' in req.body) {
    var profilePicture = req.body.profilePicture;
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err
        });
      } else {
        if (!user) {
          res.status(500).send('User not found');
        } else {
          user.profilePicture = profilePicture;
          // IDEA: update profilePicture must not affect last update
          user.updatedAt = user.updatedAt;
          user.save(function(err, user_res) {
            if (err) {
              res.status(500).json({
                success: false,
                message: err
              });
              throw err;
            }
            if (!user_res) {
              return res.end('No such user');
            } else {
              res.status(200).json({
                success: true,
                username: user_res.username,
                profilePicture: user_res.profilePicture,
              });
            }
          });
        }
      }
    });
  } else {
    res.status(500).json({
      error: 'Wrong body format'
    });
  }
});
apiRouter.post('/updatePhoneNumber', function(req, res) {
  var token = req.body.token;
  var decoded = jwtDecode(token);
  var username = decoded.username;
  if ('phoneNumber' in req.body) {
    var phoneNumber = req.body.phoneNumber;
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err
        });
        throw err;
      } else {
        if (!user) {
          res.status(500).send('User not found');
        } else {
          user.phoneNumber = phoneNumber;
          // IDEA: update phoneNumber must not affect last update
          user.updatedAt = user.updatedAt;
          user.save(function(err, user_res) {
            if (err) {
              res.status(500).send('Internal Server Error');
              throw err;
            }
            if (!user_res) {
              return res.end('No such user');
            } else {
              res.status(200).json({
                success: true,
                username: user_res.username,
                phoneNumber: user_res.phoneNumber,
              });
            }
          });
        }
      }
    });
  } else {
    res.status(500).json({
      success : false,
      message: 'Wrong body format'
    });
  }
});

apiRouter.post('/addFriend', function(req, res) {
  var token = req.body.token;
  var decoded = jwtDecode(token);
  var username = decoded.username;
  if ('friendUsername' in req.body) {
    const friendUsername = req.body.friendUsername;
    GetUserByUsername(username)
      .then(user => {
        if (user.friendList.indexOf(friendUsername) !== -1)
          throw 'Already friend';
        if (friendUsername === user.username)
          throw 'Cannot add yourself';

        // find friend
        return Promise.all([user, User.findOne({
          username: friendUsername
        })])
      }).spread((user, friend) => {
        if (!friend)
          throw `Username: ${friendUsername} doesn't exist`;

        // add to friend array
        user.friendList.push(friend.username);
        return Promise.all([user.save(), friend]);
      })
      .spread((user, friend) => {
        res.status(200).json({
          success: true,
          profile: publicUserProfile(friend),
        });
        return
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err,
        });
        return
      });
  } else {
    res.status(500).json({
      error: 'Wrong body format'
    });
  }
});

apiRouter.get('/getFriendList', function(req, res) {
  const token = req.query.token;
  GetUserByToken(token)
    .then(user => {
      res.status(200).json({
        success: true,
        username: user.username,
        friendList: user.friendList,
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err,
      })
    });
});

apiRouter.get('/getMyProfile', function(req, res) {
  const token = req.query.token;
  GetUserByToken(token)
    .then(user => {
      res.status(200).json({
        success: true,
        message: 'Successfully get user profile',
        profile: publicUserProfile(user),
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err,
      })
    });
});

apiRouter.get('/getFriendProfile', function(req, res) {
  const token = req.query.token;
  const friendUsername = req.query.friendUsername;

  if (!friendUsername) {
    res.status(500).json({
      success: false,
      message: 'Wrong body format'
    });
    return;
  }

  GetUserByToken(token)
    .then(user => {
      // check if really friend
      if (user.friendList.indexOf(friendUsername) === -1) {
        throw 'No friend with name: ' + friendUsername;
      }
      return GetUserByUsername(friendUsername);
    })
    .then(friend => {
      res.status(200).json({
        success: true,
        message: 'Successfully get friend profile',
        profile: publicUserProfile(friend),
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err,
      })
    })
})

apiRouter.post('/exit', function(req, res) {
  const token = req.body.token;
  GetUserByToken(token)
    .then(user => {
    	user.remove(function(err) {
        if(err) {
          res.status(500).json({
            success: false,
            message: err,
          })
        } else {
          res.status(200).json({
              success: true,
              message: 'Successfully exit'
          })
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err,
      })
    })
});

export default apiRouter
