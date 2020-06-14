const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleClientId, googleClientSecret } = require('../config/keys')
const User = require('../models/User')
const hashPassword = require('../utils/passwordHasher')


passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const userFromDb = await User.findById(id).select('-password')
    return done(null, userFromDb)
})

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google-login/callback',
    proxy: true 
}, async function(userAccessToken, refreshToken, profile, cb ) {
    const googleId = profile.id;
    const emails = profile.emails
    try {
         const user =  await User.findOne({ googleId })
         if (user) {
            return cb(null, user)
         }
         const userWithSameEmail = await User.findOne({ email: { $in: emails.map(({ value}) => value) }})
         if (userWithSameEmail) {
             return cb(null, userWithSameEmail)
         }
         const defaultPassword = await hashPassword(`randomPass`);
         const newUser = await new User ({
             name: profile.displayName,
             email: profile.emails[0].value,
             password: defaultPassword,
             googleId: profile.id
         }).save()

        if (newUser) {
            newUser.password = null
            return cb(null, newUser);
        }
    } catch (err) {
        console.log(err)
        return cb(null, false);
    }
}))