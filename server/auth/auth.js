const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
module.exports = ()=>{
    passport.serializeUser((user, done)=>{
        done(null,user);
    })

    passport.deserializeUser((user,done)=>{
        done(null, user);
    })

    passport.use(new GoogleStrategy({
        // clientID: %
    }))
};