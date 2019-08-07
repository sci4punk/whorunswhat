const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


const User          = require('../models/User');
// import the user model


passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});


  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      next(null, foundUser);
    });
  }));

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDINKEY,
    clientSecret: process.env.LINKEDINSECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async function(accessToken, refreshToken, profile, done) {
    // console.log(profile._json)
    const email = profile.emails[0].value;
    try {
        const userDB = await User.findOne({email});
  
        if(userDB) {
            done(null, userDB)
        } else {
            // console.log(profile)
            const newUser = new User();
            newUser.username = email;
            newUser.fullName = profile.displayName;
            newUser.personalEmail = email;
            newUser.linkedin = true;
  
            await newUser.save()
            return done(null, newUser)
        }
  
    } catch(err) {
        done(err)
    }
  }));