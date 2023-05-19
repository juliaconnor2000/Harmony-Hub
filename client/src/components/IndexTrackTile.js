import React from "react";

const IndexTrackTile = (props) => {
    return (
        <div className="song-tile">
            <img src={props.albumArt} alt={`${props.name} Album Art`} className="img-format"/>
            <p className="tile-text">{props.name}</p>
            <p className="tile-text">{props.artist}</p>
        </div>
    )
}

export default IndexTrackTile