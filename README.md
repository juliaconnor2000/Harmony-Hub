### Harmony Hub
Description: Welcome to Harmony Hub! This app allows users to download their top songs directly from their Spotify account, then share the music they listen to with other users. The user can then get music recommendations from other users and leave their own music recommendations!

### Author
Julia Connor

### Technologies used: 
    - JavaScript
    - Express
    - React
    - Foundation CSS
    - PostgreSQL

### Installation
    - For https://localhost3000 installation
    - Run `git clone https://github.com/juliaconnor2000/Harmony-Hub` in your terminal.
    - Navigate to the app in your terminal: `cd Harmony-Hub`
    - Navigate to the server folder to complete the following commands: `cd server`
    - Create the database using postGresSQL: `createdb harmony-hub_development`
    - Run yarn install in your terminal before opening the app: `yarn install`
    - Run the following command to confirm migrations are up to date: `yarn migrate:latest`
    - Open code 'code .' and in server/src/routes/SpotifyAuthRoute uncomment 'var redirect_uri = 'http://localhost:3000/auth/spotify/callback'' 
    - Start server by running: `yarn dev`

### Usage:
Follow installation guidelines and navigate to https://localhost:300/

This was a solo capstone project done at Launch Academy. The goal of this project is to allow users to download their top songs from Spotify and get recommendations for new music from other users.
