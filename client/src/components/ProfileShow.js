import React, { useState, useEffect } from "react";
import TrackTile from "./TrackTile.js";

const ProfileShow = props => {

    const [userTracks, setUserTracks] = useState([])
    const [playingTrackAudio, setPlayingTrackAudio] = useState(null)
    const [playingTrackId, setPlayingTrackId] = useState(null);

    const getUserTracks = async () => {
        try {
            const response = await fetch (`/api/v1/tracks/user`)
            if (!response.ok) {
                throw(new Error(`${response.status} (${response.statusText})`))
            }
            const body = await response.json()
            setUserTracks(body.tracks)
        } catch (err) {
            console.log(`Error in getUserTracks fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getUserTracks()
    }, [])

    const trackTiles = userTracks.length > 0 ? (
        userTracks.map((track) => (
            <TrackTile
                key={track.id}
                id={track.id}
                name={track.name}
                artist={track.artist}
                albumArt={track.albumArt}
                trackAudio={track.trackAudio}
                favorite={track.favorite}
                setPlayingTrackAudio={setPlayingTrackAudio}
                playingTrackAudio={playingTrackAudio}
                setPlayingTrackId={setPlayingTrackId}
                playingTrackId={playingTrackId}
            />
        ))
    ) : (
        <div className="download-section">
            <a href="/auth/spotify" className="button download-button">Download Songs From Spotify</a>
            <p>To access your profile, please download your songs from Spotify!</p>
        </div>
    )

    let profileInfoSection = null

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
            {topSongs}
            <div className="container">
                {trackTiles}
            </div>
        </div>
    )
}

export default ProfileShow