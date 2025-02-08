import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../models/User.model";

dotenv.config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
  throw new Error("Invalid client credentials");
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email: profile.emails && profile.emails[0].value,
          avatar: profile.photos && profile.photos[0].value,
        };
        let userData = {};
        const userCheck = await User.findOne({ googleId: user.googleId });

        if (userCheck) {
          userData = {
            _id: userCheck._id,
            email: userCheck.email,
            avatar: userCheck.avatar,
            name: userCheck.name,
          };
        } else {
          const newUser = await User.create(user);
          userData = {
            _id: newUser._id,
            email: newUser.email,
            avatar: newUser.avatar,
            name: newUser.name,
          };
        }

        callback(null, userData);
      } catch (error) {
        if (error instanceof Error) {
          return callback(error, false);
        }
        return callback(new Error("Unknown error occured"), profile);
      }
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user: Express.User, callback) => {
  callback(null, user);
});

export default passport;
