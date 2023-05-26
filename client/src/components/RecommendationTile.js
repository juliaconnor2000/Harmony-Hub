import React, {useState} from "react";

const RecommendationTile = (props) => {

    let textBodySection
    if (props.textBody) {
      textBodySection = (
        <>
          <p>Other Comments:</p>
          <p>{props.textBody}</p>
        </>
      )
    }

    return (
        <div className="recommendation-tile">

            <p>{props.recommendedTrack} by {props.recommendedArtist}</p>
            {textBodySection}
        </div>
    )
}

export default RecommendationTile