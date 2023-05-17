import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const LandingPage = props => {

//     const [userInfo, setUserInfo] = useState([])
//     const [shouldRedirect, setShouldRedirect] = useState(false)

//     const getUserInfo = async () => {
//         try {
//             // swap this with a fetch request to spotifyRouter
//             // const response = await fetch (`/api/v1/authSpotifyRouter`, {
//             const response = await fetch (`https://api.spotify.com`, {
//                 method: "GET",
//                 headers: new Headers({
//                     "Authorization": "Bearer"

//                 }),
//                 // body: JSON.stringify(response)
//             })
//             if (!response.ok) {
//                 throw(new Error(`${response.status} (${response.statusText})`))
//             }
//             const body = await response.json()
//             console.log(body)
//             setUserInfo(body)
//             setShouldRedirect(true) //brings us to profile page
//         } catch (err) {
//             console.log(`Error in getUserInfo fetch: ${err.message}`)
//         }
//         }
    
//     useEffect(() => {
//         getUserInfo()
//     }, [])

//     // console.log(userInfo.country)

//     if (shouldRedirect){
//         return <Redirect push to="/profile-page" />
//     }

  return (
    <>
      <h1>Landing Page</h1>

      {/* <a href="/auth/spotify" className="button">Sign in with Spotify</a> */}
 
    </>
  );
};

export default LandingPage;
