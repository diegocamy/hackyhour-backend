const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../db/models/users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/googleOauth',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const {
          _json: { sub: id, name, picture },
        } = profile;

        //check database to see if user already created
        const foundUser = await User.findOne({ id: id });
        if (foundUser) {
          //check if user has changed profile picture
          if (foundUser.picture !== picture) {
            //update user new profile pic on database
            foundUser.picture = picture;
            const updatedUser = await foundUser.save();
            return done(null, updatedUser);
          }

          return done(null, foundUser);
        }

        //if user is new
        const newUser = new User({
          oauth: 'google',
          id,
          name,
          picture,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, null, error.message);
      }
    }
  )
);
