import React, { useState, useEffect } from "react";
import TrackTile from "./TrackTile.js";
// import { Track } from "../../../server/src/models/index.js"

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
    console.log(tracks)

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
        <a href="/auth/spotify" className="button">Download Songs From Spotify</a>
    )

    // tracks

    // console.log(tracks)

    return (
        <>
            {/* <a href="/auth/spotify" className="button">Download Songs From Spotify</a> */}
            {/* {user.email} */}
            {trackTiles}
            {/* profilepic
            name
            followers/following
            songs youve been listening to
            recommendations youve been given */}
        </>
    )
}

export default ProfileShow