const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

// JSON WEB TOKEN STRATEGY

// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     secretOrKey : JWT_SECRET
// }, (payLoad, done) =>{
//     User.findById(payLoad.sub)
//         .then( user =>{
//             if(!user){
//                 return done(null, false);
//             }
//             return done(null, user);
//         })
//         .catch( e => {
//             done('error, false');
//         });
//  }

// ));


// // LOCAL STRATEGY 

passport.use(new LocalStrategy(
  {usernameField:"email"},
  function(username, password, done) {
    User.findOne({email : username})
      .then(user => {
        if(!user) throw new Error('Email is invalid');
        return user.validPassword(password);
        
      })
      .then(user => {
         if(!user) throw new Error('Pass is invalid');
        done(null, user)
      })
      .catch(e =>{
        return done(null, false, { message: 'Incorrect password.' });
      })
  }
));
