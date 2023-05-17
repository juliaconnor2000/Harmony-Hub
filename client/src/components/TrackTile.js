import React from "react";

const TrackTile = (props) => {
    return (
        <div className="callout">
            <p>{props.name}</p>
            <p>{props.artist}</p>
        </div>
    )
}

export default TrackTile