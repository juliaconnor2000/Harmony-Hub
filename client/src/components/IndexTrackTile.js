import React from "react";
import { useState, useEffect } from "react";

const IndexTrackTile = (props) => {

    const [user, setUser] = useState([])

    const getUser = async () => {
        try {
            const response = await fetch (`/api/v1/user-info/${props.userId}`)
            if (!response.ok) {
                throw(new Error(`${response.status} (${response.statusText})`))
            }
            const body = await response.json()
            setUser(body.user)
        } catch (err) {
            console.log(`Error in getUser fetch: ${err.message}`)
        }
    }
  
    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="song-tile-index index-section">
            <div className="index-profile-section">
                <img src={user.profilePicture} alt={`${user.displayName} Profile Picture`} className="index-profile-picture"/>
                <p className="index-profile-text">{user.displayName}</p>
            </div>
            <img src={props.albumArt} alt={`${props.name} Album Art`} className="img-format"/>
            <p className="tile-text">{props.name}</p>
            <p className="tile-text">{props.artist}</p>
        </div>
    )
}

export default IndexTrackTile