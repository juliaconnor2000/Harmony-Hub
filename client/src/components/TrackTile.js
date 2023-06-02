import React from "react";
import AudioPlayer from "./AudioPlayer.js";
// import FavoriteComponent from "./FavoriteComponent.js";

const TrackTile = (props) => {
    return (
        <div className="song-tile">
            <img src={props.albumArt} alt={`${props.name} Album Art`} className="img-format"/>
            <p className="tile-text">{props.name}</p>
            <p className="tile-text artist-text">{props.artist}</p>
            <AudioPlayer 
                trackAudio={props.trackAudio}
                trackId={props.id} 
                setPlayingTrackAudio={props.setPlayingTrackAudio} 
                playingTrackAudio={props.playingTrackAudio}
                setPlayingTrackId={props.setPlayingTrackId}
                playingTrackId={props.playingTrackId}
            />
            {/* <FavoriteComponent track={props}/> */}
        </div>
    )
}

export default TrackTile