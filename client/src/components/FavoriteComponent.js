import React, { useState, useRef } from "react";

const FavoriteComponent = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [track, setTrack] = useState(props.track)

  console.log(props.track.id)


    const makeFavorite = async () => {
      try {
          const response = await fetch (`/api/v1/tracks/${props.track.id}/favorite`)
          if (!response.ok) {
              throw(new Error(`${response.status} (${response.statusText})`))
          }
          const body = await response.json()
          setTrack(body.track)
      } catch (err) {
          console.log(`Error in makeFavorite fetch: ${err.message}`)
      }
    }

    console.log(track)

  const handleUnFavorite = () => {
    const updatedTrack = {
      ...props.track,
      favorite: false,
    };
    makeFavorite(updatedTrack);
    setIsFavorite(false);
  };

  const handleFavorite = () => {
    const updatedTrack = {
      ...props.track,
      favorite: true,
    };
    makeFavorite(updatedTrack);
    setIsFavorite(true);
  };

  return (
    <div>
      {isFavorite ? (
        <button onClick={handleUnFavorite}>★ Unfavorite this song</button>
      ) : (
        <button onClick={handleFavorite}>☆ Favorite this song</button>
      )}
    </div>
  );
}

export default FavoriteComponent;