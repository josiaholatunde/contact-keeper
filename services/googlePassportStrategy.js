const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleClientId, googleClientSecret } = require('../config/keys')
const UserService = require('./UserService')


passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const userFromDb = await User.find({ googleId: id }).select('-password')
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
         const user =  await UserService.getUser({ googleId })
         if (user) {
            return cb(null, user)
         }
         const userWithSameEmail = await UserService.getUser({ _id: { $in: emails }})
         if (userWithSameEmail) {
             return cb(null, userWithSameEmail)
         }
         console.log('i', userWithSameEmail)

         const newUser = await new User ({
             name: profile.displayName,
             emails: profile.emails[0].value,
             password: `randomPass`,
             googleId: profile.id
         }).save()

         if (newUser) {
             newUser.password = null
             return cb(null, newUser);
         }
    } catch (err) {
        return cb(null, false);
    }
}))