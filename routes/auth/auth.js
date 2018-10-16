const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const User = require('../../db/models/User');

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username.toLowerCase()
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username.toLowerCase()
      });
    })
    .catch(err => {
      console.log('error : ', err)
      return done(err);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  return new User({ username: username })
    .fetch()
    .then(user => {
      user = user.toJSON();
      if (user === null) {
        return done(null, false, { message: 'Invalid Username and/or Password' });
      } else {
        bcrypt.compare(password, user.password)
          .then(samePassword => {
            if (samePassword) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid Username and/or Password' });
            };
          });
      };
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err);
    });
}));

router.post('/register', (req, res) => {
  let { username } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return new User({
        username: username.toLowerCase(),
        password: hashedPassword,
      })
        .save()
        .then(result => {
          //pluck off id and username to be stored in local storage
          let userProfile = {
            id: result.attributes.id,
            username: result.attributes.username,
          }
          res.json(userProfile)
        })
        .catch(err => {
          console.log('error : ', err)
          return res.send('Unable to register with that username');
        });
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    req.login(user, err => {
      if (err) {
        return next(err);
      } else {
        let userProfile = {
          id: user.id,
          username: user.username
        }
        return res.json(userProfile);
      }
    })
  })(req, res, next)
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true })
});


module.exports = router;