import React, { useState, useEffect } from "react";

const ProfileShow = props => {

    //     const getUserInfo = async () => {
    //     try {
    //         // swap this with a fetch request to spotifyRouter
    //         // const response = await fetch (`/api/v1/authSpotifyRouter`, {
    //         const response = await fetch (`/auth/spotify`, {
    //             // body: JSON.stringify(response)
    //         })
    //         if (!response.ok) {
    //             throw(new Error(`${response.status} (${response.statusText})`))
    //         }
    //         const body = await response.json()
    //         console.log(body)
    //         // setUserInfo(body)
    //         // setShouldRedirect(true) //brings us to profile page
    //     } catch (err) {
    //         console.log(`Error in getUserInfo fetch: ${err.message}`)
    //     }
    //     }
    
    // useEffect(() => {
    //     getUserInfo()
    // }, [])

    return (
        <>
            <a href="/auth/spotify" className="button">Download Songs From Spotify</a>
            {/* {user.email} */}
            {/* profilepic
            name
            followers/following
            songs youve been listening to
            recommendations youve been given */}
        </>
    )
}

export default ProfileShow