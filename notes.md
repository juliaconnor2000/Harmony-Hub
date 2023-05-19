* pause on your current auth spotify code from the tutorial 

* do the Auth with Third Party API article with Google (not in your BT)

* review the spotify passport strategy and see how you can add it to your BT (it will be very similar to auth with Google)


* once you have the access / refresh token, you will either want to save those tokens on the user record, or in a session
    * you will need to make a migration to minimally add a "spotifyId" column to your users table 
    * you may also decide to add a refresh and access token column (or store in a session cookie)

* with that token, you will make requests to the spotify api, and add the token to your request (either as a query param or as a header)

```
const spotifyAuthHandler = (accessToken, refreshToken, profile, done) => {
    <!-- once you have the tokens, you can save them on a user record -->
    <!-- then, when you actually want to query spotify for artists and songs, you'll get the current user and use their tokens -->
};
```

<!-- take with a grain of salt -->
* later on, you may find that the PostMan application can help you test requests to the spotify