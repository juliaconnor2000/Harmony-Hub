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
        <div className="song-tile">
            <p className="text-tile">{user.email}</p>
            <img src={props.albumArt} alt={`${props.name} Album Art`} className="img-format"/>
            <p className="tile-text">{props.name}</p>
            <p className="tile-text">{props.artist}</p>
        </div>
    )
}

export default IndexTrackTile