import React, { useState, useRef } from "react";

const FavoriteComponent = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.track.favorite);

    const makeFavorite = async () => {
      try {
          const response = await fetch (`/api/v1/tracks/${props.track.id}/favorite`)
          if (!response.ok) {
              throw(new Error(`${response.status} (${response.statusText})`))
          }
          const body = await response.json()
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
          setIsFavorite(false)
      } catch (err) {
          console.log(`Error in makeUnFavorite fetch: ${err.message}`)
      }
    }

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