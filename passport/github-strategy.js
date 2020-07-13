const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../db/models/users');
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/githubOauth',
    },
    async (accesToken, refreshToken, profile, done) => {
      console.log(profile);
      const { id, avatar_url: picture, name } = profile._json;
      //check to find if user exists in db
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

      //if not, create a new user
      const newUser = new User({
        id,
        oauth: 'github',
        name,
        picture,
      });

      await newUser.save();

      return done(null, newUser);
    }
  )
);
