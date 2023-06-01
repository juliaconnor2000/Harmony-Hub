import React from "react";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.js";
import NewRecommendationForm from "./NewRecommendationForm.js";
import ErrorList from "./layout/ErrorList.js";
import translateServerErrors from "../services/translateServerErrors.js"
import RecommendationTile from "./RecommendationTile.js";

const IndexTrackTile = (props) => {

    const [track, setTrack] = useState({
            name: props.name,
            artist: props.artist,
            albumArt: props.albumArt,
            userId: props.userId,
            trackAudio: props.trackAudio,
            recommendations: []
        })

    const [errors, setErrors] = useState({})

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

    const getRecommendations = async () => {
        try {
            const response = await fetch (`/api/v1/tracks/${props.id}`)
            if (!response.ok) {
                throw(new Error(`${response.status} (${response.statusText})`))
            }
            const body = await response.json()
            setTrack({...track, recommendations: body.track.recommendations})
        } catch (err) {
            console.log(`Error in getUser fetch: ${err.message}`)
        }
    }
  
    useEffect(() => {
        getRecommendations()
    }, [])

    // console.log(props.currentUser)

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
                const updatedRecommendations = track.recommendations.concat(responseBody.recommendation)
                setErrors([])
                setTrack({...track, recommendations: updatedRecommendations})
                setShowRecommendations(true)
            }
        } catch (error) {
            console.error(`Error in postNewRecommendation fetch: ${error.message}`)
        }
    }

    const [showRecommendations, setShowRecommendations] = useState(false);
    
    const handleShowRecommendations = () => {
        setShowRecommendations(true);
      };

      const handleCloseRecommendations = () => {
        setShowRecommendations(false)
      }

      let recommendationTiles
      let closeButton

      if (track.recommendations.length === 0) {
        recommendationTiles = (
            <p className="no-recommendations-yet">No Recommendations Yet!</p>
        )
      } else if (!showRecommendations) {
        recommendationTiles = (
          <div>
            <button className="show-recommendation-button" onClick={handleShowRecommendations}>Show Recommendations</button>
          </div>
        );
      } else {
        recommendationTiles = (
            track.recommendations.map((recommendation) => (
                <RecommendationTile
                    key={recommendation.id}
                    id={recommendation.id}
                    recommendedTrack={recommendation.recommendedTrack}
                    recommendedArtist={recommendation.recommendedArtist}
                    textBody={recommendation.textBody}
                    recommendeeId={recommendation.recommendeeId}
                    recommenderId={recommendation.recommenderId}
                    trackId={recommendation.trackId}
                />
            ))
        )
        closeButton = <button className="close-recommendation-button" onClick={handleCloseRecommendations}>Collapse Recommendations</button>
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
            <div>
                {recommendationTiles}
                {closeButton}
            </div>
            <div>
                <ErrorList errors={errors}/>
                <NewRecommendationForm postNewRecommendation={postNewRecommendation} currentUser={props.currentUser}/>
            </div>
        </div>
    )
}

export default IndexTrackTile