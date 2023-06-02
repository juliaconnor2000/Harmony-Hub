import React, { useState, useRef } from "react";

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // console.log(props)

  const handlePlay = () => {
    if (props.playingTrackAudio && props.playingTrackAudio.current) {
      // Pause the currently playing track if it exists
      props.playingTrackAudio.current.pause();
    }
  
    if (audioRef && audioRef.current) {
      // Play the clicked track
      audioRef.current.play();
    }
  
    setIsPlaying(true);
    props.setPlayingTrackAudio(audioRef);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    props.setPlayingTrackAudio(null)
  };

  return (
    <div className="play-pause-buttons">
      {props.trackAudio ? (
        <>
          <audio ref={audioRef} src={props.trackAudio} />
          {isPlaying ? (
            <button onClick={handlePause}>⏸</button>
          ) : (
            <button onClick={handlePlay}>▶</button>
          )}
        </>
      ) : (
        <p className="no-audio-text">No preview available</p>
      )}
    </div>
  );
}

export default AudioPlayer;