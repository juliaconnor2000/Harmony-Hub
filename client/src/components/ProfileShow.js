import React, { useState, useEffect } from "react";
import TrackTile from "./TrackTile.js";

const ProfileShow = props => {

    const [tracks, setTracks] = useState([])

    const getTracks = async() => {
        try {
            const response = await fetch (`/api/v1/tracks`)
            if (!response.ok) {
                throw(new Error(`${response.status} (${response.statusText})`))
            }
            const body = await response.json()
            setTracks(body.tracks)
        } catch (err) {
            console.log(`Error in getTracks fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getTracks()
    }, [])

    const trackTiles = tracks.length > 0 ? (
        tracks.map((track) => (
            <TrackTile
                key={track.id}
                id={track.id}
                name={track.name}
                artist={track.artist}
                albumArt={track.albumArt}
                //userId={track.userId}
            />
        ))
    ) : (
        <div className="download-section">
            <a href="/auth/spotify" className="button download-button">Download Songs From Spotify</a>
            <p>To access your profile, please download your songs from Spotify!</p>
        </div>
    )

    let profileInfoSection = null

    console.log(props.currentUser)

    if (props.currentUser && props.currentUser.profilePicture) {
        profileInfoSection = (
            <div className="profile-container">
                <img src={props.currentUser.profilePicture} alt={`${props.currentUser.displayName} Spotify Profile Picture`} className="profile-image"/>
                <div className="profile-text-section">
                    <p className="profile-text">Name: {props.currentUser.displayName}</p>
                    <p className="profile-text">Email: {props.currentUser.email}</p>
                </div>
            </div>
        )
    }

    let topSongs = null
    if (profileInfoSection) {
        topSongs = (
            <p className="top-songs-text">Your top songs</p>
        )

    }

    return (
        <div>
            {profileInfoSection}
            {/* <p>Your Top Songs</p> */}
            {topSongs}
            <div className="container">
                {trackTiles}
            </div>
            {/* <p>recommendations under each song prolly</p> */}
        </div>
    )
}

export default ProfileShow