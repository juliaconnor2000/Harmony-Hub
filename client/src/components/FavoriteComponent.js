// import React, { useState, useRef } from "react";

// const FavoriteComponent = (props) => {
//   const [isFavorite, setIsFavorite] = useState(false);


//   //   const makeFavorite = async () => {
//   //     try {
//   //         const response = await fetch (`/api/v1/tracks/favorite`)
//   //         if (!response.ok) {
//   //             throw(new Error(`${response.status} (${response.statusText})`))
//   //         }
//   //         const body = await response.json()
//   //         setUser(body.track)
//   //     } catch (err) {
//   //         console.log(`Error in getUser fetch: ${err.message}`)
//   //     }


//   // }

//   const handleUnFavorite = () => {
//     const updatedTrack = {
//       ...props.track,
//       favorite: false,
//     };
//     updateTrackInDataSource(updatedTrack);
//     setIsFavorite(false);
//   };

//   const handleFavorite = () => {
//     const updatedTrack = {
//       ...props.track,
//       favorite: true,
//     };
//     updateTrackInDataSource(updatedTrack);
//     setIsFavorite(true);
//   };

//   return (
//     <div>
//       {isFavorite ? (
//         <button onClick={handleUnFavorite}>★ Unfavorite this song</button>
//       ) : (
//         <button onClick={handleFavorite}>☆ Favorite this song</button>
//       )}
//     </div>
//   );
// }

// export default FavoriteComponent;