import express from "express";
import request from "request";
import querystring from "node:querystring"
import dotenv from "dotenv";
// import Track from '../models/Track.js'
import {Track} from '../models/index.js'
// import getCurrentUser from "../../../client/src/services/getCurrentUser.js";
dotenv.config();
var client_id= process.env.CLIENT_ID
var client_secret= process.env.CLIENT_SECRET

var redirect_uri = 'http://localhost:3000/auth/spotify/callback'

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

const authSpotifyRouter = new express.Router();

// when a user clicks on the google login button, it will issue a request to this route.
// passport.authenticate will redirect the user to Google to allow the sharing of their information. 
// The "scope" tells google what pieces of information we wish to retrieve
// authGoogleRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authSpotifyRouter.get('/', function(req, res) {
  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email user-top-read';
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

authSpotifyRouter.get('/callback', function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
      }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token
          // var refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          request.get(options, async function(error, response, body) {
            if (!error && response.statusCode === 200) {
              const tracksData = body.items;
              const tracks = [];
              tracksData.forEach((trackData) => {
                const track = {
                  name: trackData.name,
                  artist: trackData.artists[0].name,
                  albumArt: trackData.album.images[0].url,
                  userId: req.user.id // Assuming you have user authentication and req.user contains the authenticated user's data
                };
    
                tracks.push(track);
              });
              try {
                // Save tracks to the database
                const savedTracks = await Track.query().insert(tracks);
                console.log(`${savedTracks.length} tracks saved successfully.`);
                // res.status(200).json({ message: "Tracks saved successfully" });
                res.redirect('/profile-page')
              } catch (error) {
                console.error(`Error saving tracks: ${error.message}`);
                res.status(500).json({ error: "Internal server error" });
              }
            } else {
              console.error("Error retrieving tracks from Spotify API");
              res.status(500).json({ error: "Internal server error" });
            }
          });
    
  
          // use the access token to access the Spotify Web API
          // request.get(options, function(error, response, body) {

            // console.log(body);
            // body.items.map(async item => {
            //   await Track.query().insert(
            //     {
            //       name: item.name,
            //       artist: item.artists,
            //       albumArt: item.album,
            //       // userId: await getCurrentUser()
            //     }
            //   )
              
            // })
          // });

          
  
          // we can also pass the token to the browser to make requests from there
          // res.redirect('/profile-page/#' +
          //   querystring.stringify({
          //     access_token: access_token,
          //     refresh_token: refresh_token
          //   }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
});

authSpotifyRouter.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

export default authSpotifyRouter;