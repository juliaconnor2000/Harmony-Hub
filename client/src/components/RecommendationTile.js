import React, {useState} from "react";

const RecommendationTile = (props) => {

    const [showRecommendations, setShowRecommendations] = useState(false);
    
    const handleShowRecommendations = () => {
        setShowRecommendations(true);
      };

      const handleCloseRecommendations = () => {
        setShowRecommendations(false)
      }

      if (!showRecommendations) {
        return (
          <div>
            <button className="show-recommendation-button" onClick={handleShowRecommendations}>Show Recommendations</button>
          </div>
        );
      }

    // const isSameUser = currentUser && currentUser.id === userId

    // const clickHandler = () => {
    //     handleDeleteReview(reviewId)
    // }

    return (
        <div>

            <p>{props.recommendedTrack}</p>
            <p>{props.recommendedArtist}</p>
            <p>{props.textBody}</p>
        {/* {(isSameUser) && (
            <button type="delete" className="button" onClick={clickHandler}>Delete</button>
        )} */}
            <button onClick={handleCloseRecommendations}>Collapse Recommendations</button>

        </div>
    )
}

export default RecommendationTile