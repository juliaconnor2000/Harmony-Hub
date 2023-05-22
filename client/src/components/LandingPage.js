import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import IndexTrackTile from "./IndexTrackTile.js"

const LandingPage = props => {

  const [tracks, setTracks] = useState([])

  const getTracks = async() => {
      try {
          const response = await fetch (`/api/v1/tracks`)
          if (!response.ok) {
              throw(new Error(`${response.status} (${response.statusText})`))
          }
          const body = await response.json()
          setTracks(body.tracks)
      } catch (err) {
          console.log(`Error in getTracks fetch: ${err.message}`)
      }
  }

  useEffect(() => {
      getTracks()
  }, [])

  // tracks is now randomized
  for (let i = tracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
  }

  // array of 3 songs from each user
  // let arrayOfTracks = []
  // tracks.forEach(track => {
  //   let alreadyExists = 0
  //   arrayOfTracks.forEach(trackInArray => {
  //     if (track.userId === trackInArray.userId) {
  //       alreadyExists++
  //     }
  //   })
  //   if (alreadyExists <= 3) {
  //     arrayOfTracks.push(track)
  //   }
  // })

  const trackTile = tracks.map(track => {
    return (
    <IndexTrackTile
      key={track.id}
      id={track.id}
      name={track.name}
      artist={track.artist}
      albumArt={track.albumArt}
      userId={track.userId}
    />
    )
  })

  return (
    <>
      <h1 className="index-title">What Users Are Listening To</h1>
      <div className="container">
        {trackTile}
      </div>
    </>
  );
};

export default LandingPage;
