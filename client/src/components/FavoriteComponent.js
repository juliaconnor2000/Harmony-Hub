import React, { useState, useRef } from "react";

const FavoriteComponent = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.track.favorite);
  const [track, setTrack] = useState(props.track)

  console.log(isFavorite)


    const makeFavorite = async () => {
      try {
          const response = await fetch (`/api/v1/tracks/${props.track.id}/favorite`)
          if (!response.ok) {
              throw(new Error(`${response.status} (${response.statusText})`))
          }
          const body = await response.json()
          setTrack(body.track)
          setIsFavorite(true)
      } catch (err) {
          console.log(`Error in makeFavorite fetch: ${err.message}`)
      }
    }

    const makeUnFavorite = async () => {
      try {
          const response = await fetch (`/api/v1/tracks/${props.track.id}/unfavorite`)
          if (!response.ok) {
              throw(new Error(`${response.status} (${response.statusText})`))
          }
          const body = await response.json()
          setTrack(body.track)
          setIsFavorite(false)
      } catch (err) {
          console.log(`Error in makeUnFavorite fetch: ${err.message}`)
      }
    }

  //   console.log(track)

  // const handleUnFavorite = () => {
  //   const updatedTrack = {
  //     ...props.track,
  //     favorite: false,
  //   };
  //   makeFavorite(updatedTrack);
  //   setIsFavorite(false);
  // };

  // const handleFavorite = () => {
  //   const updatedTrack = {
  //     ...props.track,
  //     favorite: true,
  //   };
  //   makeFavorite(updatedTrack);
  //   setIsFavorite(true);
  // };

  return (
    <div>
      {isFavorite ? (
        <button onClick={makeUnFavorite}>★ Unfavorite this song</button>
      ) : (
        <button onClick={makeFavorite}>☆ Favorite this song</button>
      )}
    </div>
  );
}

export default FavoriteComponent;