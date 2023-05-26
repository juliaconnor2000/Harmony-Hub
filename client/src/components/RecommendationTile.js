import React, {useState, useEffect} from "react";

const RecommendationTile = (props) => {

  // console.log(props)

  const [recommender, setRecommender] = useState([])

    const getUser = async () => {
        try {
            const response = await fetch (`/api/v1/user-info/${props.recommenderId}`)
            if (!response.ok) {
                throw(new Error(`${response.status} (${response.statusText})`))
            }
            const body = await response.json()
            setRecommender(body.user)
        } catch (err) {
            console.log(`Error in getUser fetch: ${err.message}`)
        }
    }
  
    useEffect(() => {
        getUser()
    }, [])

    console.log(recommender)

    let textBodySection
    if (props.textBody) {
      textBodySection = (
        <div className="recommendation-other-comments">
          <p>Other Comments:</p>
          <p>{props.textBody}</p>
        </div>
      )
    }

    return (
      <div className="recommendation-tile">
        <img className="recommender-picture"src={recommender.profilePicture} alt={`${recommender.displayName} Profile Picture`}/>
        <p className="recommender-name">{recommender.displayName} recommends:</p>
        
        <div>
            <p className="recommendation-track">{props.recommendedTrack} by {props.recommendedArtist}</p>
            {textBodySection}
        </div>
      </div>
    )
}

export default RecommendationTile