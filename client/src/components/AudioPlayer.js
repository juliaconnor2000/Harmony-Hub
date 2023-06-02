import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (props.playingTrackAudio && props.playingTrackAudio.current) {
      props.playingTrackAudio.current.pause();
    }
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
    if (props.onPlay) {
      props.onPlay(props.trackId);
    }
  
    setIsPlaying(true);
    props.setPlayingTrackId(props.trackId)
    props.setPlayingTrackAudio(audioRef);
  };

  const handlePause = () => {
    audioRef.current.pause();
    if (props.onPause) {
      props.onPause(props.trackId);
    }

    setIsPlaying(false);
    props.setPlayingTrackId(null)
    props.setPlayingTrackAudio(null)
  };

  useEffect(() => {
    if (props.trackId !== props.playingTrackId) {
      setIsPlaying(false);
    }
  }, [props.trackId, props.playingTrackId]);

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