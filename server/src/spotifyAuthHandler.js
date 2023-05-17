// import { Strategy as SpotifyStrategy } from "passport-spotify";
// import dotenv from "dotenv";

// import User from "../models/User.js";

// dotenv.config();

// // this gets run after the GoogleAuth process is completed.
// const spotifyAuthHandler = (accessToken, refreshToken, profile, done) => {
//   User.query()
//     .findOne({ spotifyId: profile?.id })
//     .then(user => {
//       // if user logged in before
//       if (user) {
//         return done(null, user);
//       }

//       // if you look at this log, all of the profile info on this user is available from Google!
//       console.log(profile);

//       // if user hasn't logged in before
//       User.query()
//         .insertAndFetch({
//           spotifyId: profile.id,
//           email: profile.emails[0].value
//         })
//         .then(user => {
//           return done(null, user);
//         });
//     });
// };

// const spotifyStrategy = new SpotifyStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   spotifyAuthHandler
// );

// export default spotifyStrategy;