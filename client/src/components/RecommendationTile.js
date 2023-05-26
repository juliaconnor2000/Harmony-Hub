import React, {useState} from "react";

const RecommendationTile = (props) => {

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
            <p className="recommendation-track">{props.recommendedTrack} by {props.recommendedArtist}</p>
            {textBodySection}
        </div>
    )
}

export default RecommendationTile