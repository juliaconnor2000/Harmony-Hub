import React from "react";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.js";
import NewRecommendationForm from "./NewRecommendationForm.js";
// import ErrorList from "./ErrorList.js"
import translateServerErrors from "../services/translateServerErrors.js"

const IndexTrackTile = (props) => {

    const [track, setTrack] = useState({
            name: props.name,
            artist: props.artist,
            albumArt: props.albumArt,
            userId: props.userId,
            trackAudio: props.trackAudio,
            // recommendations: props.recommendations
        })

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

    const postNewRecommendation = async (newRecommendation) => {
        try {
            const response = await fetch(`/api/v1/tracks/${props.id}/recommendations`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newRecommendation)
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    return setErrors(translateServerErrors(errorBody.errors))
                } else {
                    throw new Error(`${response.status} (${response.statusText})`)
                }
            } else {
                const responseBody = await response.json()
                const updatedRecommendations = props.recommendations.concat(responseBody.recommendation)
                setErrors([])
                setTrack({...track, recommendations: updatedRecommendations})
            }
        } catch (error) {
            console.error(`Error in postNewRecommendation fetch: ${error.message}`)
        }
    }

    return (
        <div className="index-section">
            <div className="index-profile-section">
                <img src={user.profilePicture} alt={`${user.displayName} Profile Picture`} className="index-profile-picture"/>
                <p className="index-profile-text">{user.displayName}</p>
            </div>
            <img src={props.albumArt} alt={`${props.name} Album Art`} className="img-format"/>
            <div className="index-song-section">
                <p className="tile-text">{props.name}</p>
                <p className="tile-text artist-text">{props.artist}</p>
                <AudioPlayer trackAudio={props.trackAudio}/>
            </div>
            <NewRecommendationForm postNewRecommendation={postNewRecommendation}/>
        </div>
    )
}

export default IndexTrackTile