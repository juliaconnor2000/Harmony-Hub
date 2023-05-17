// import express from "express";
// import passport from "passport";
// import { User } from "../models/index.js";

// // const SpotifyStrategy = require('passport-spotify').Strategy;
// // import {Strategy} from 'passport-spotify'

// // const SpotifyStrategy = Strategy

// import spotifyStrategy from "../spotifyAuthHandler.js";

// passport.use(
//   new spotifyStrategy(
//     {
//       clientID: client_id,
//       clientSecret: client_secret,
//       callbackURL: 'http://localhost:3000/auth/spotify/callback'
//     },
//     function(accessToken, refreshToken, profile, done) {
//         //check user table for anyone with a facebook ID of profile.id
//         console.log(User.query())
//         User.query().findOne({
//             'facebook.id': profile.id 
//         }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             //No user was found... so create a new user with values from Facebook (all the profile. stuff)
//             if (!user) {
//                 user = new User({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     username: profile.username,
//                     provider: 'facebook',
//                     //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
//                     facebook: profile._json
//                 });
//                 user.save(function(err) {
//                     if (err) console.log(err);
//                     return done(err, user);
//                 });
//             } else {
//                 //found user. Return
//                 return done(err, user);
//             }
//         });
//     }
//   )
// );

// const authSpotifyRouter = new express.Router();

// authSpotifyRouter.get("/",
//     passport.authenticate("spotify", 
//         {scope: ["user-read-email", "user-read-private", "user-top-read"],
//         showDialog: true 
//     })
// )

// authSpotifyRouter.get('/callback', passport.authenticate('spotify', 
//   { 
//     successRedirect: "/profile",
//     failureRedirect: "/auth/failure"
//   })
// )

// export default authSpotifyRouter;