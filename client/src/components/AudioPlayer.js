import React, { useState, useRef } from "react";

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // return (
  //   <div className="play-pause-buttons">
  //     <audio ref={audioRef} src={props.trackAudio} />
  //     {isPlaying ? (
  //       <button onClick={handlePause}>⏸</button>
  //     ) : (
  //       <button onClick={handlePlay}>▶</button>
  //     )}
  //   </div>
  // );
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