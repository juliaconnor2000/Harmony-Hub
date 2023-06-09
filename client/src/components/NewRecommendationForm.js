import React, { useState, useEffect } from "react"
import ErrorList from "./layout/ErrorList.js";

const NewRecommendationForm = ({postNewRecommendation, currentUser, setOpenRecommendationFormId, openRecommendationFormId, trackId, errors, showForm, setShowForm}) => {

    const [newRecommendation, setNewRecommendation] = useState ({
        recommendedTrack: "",
        recommendedArtist: "",
        textBody: "",
    })

    const handleInputChange = (event) => {
        setNewRecommendation({
            ...newRecommendation,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const clearForm = () => {
        setNewRecommendation({
            recommendedTrack: "",
            recommendedArtist: "",
            textBody: "",
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postNewRecommendation(newRecommendation)
        setShowForm(false)
        clearForm()
    }

    const handleAddRecommendation = () => {
        setShowForm(true);
        setOpenRecommendationFormId(trackId)
      };

      const handleCloseRecommendation = () => {
        setShowForm(false)
        setOpenRecommendationFormId(null)
      }

      useEffect(() => {
        if (trackId !== openRecommendationFormId) {
          setShowForm(false);
        }
      }, [trackId, openRecommendationFormId]);
    
      if (!showForm) {
        return (
          <div>
            <button className="add-recommendation-button" onClick={handleAddRecommendation}>Add Recommendation</button>
          </div>
        );
      }

      if ((showForm) & (currentUser === null)) {
        return (
            <div>
                <button className="add-recommendation-button" onClick={handleAddRecommendation}>Add Recommendation</button>
                <p className="login-to-add">Please Log In to Add Recommendation!</p>
            </div>
        )
      }

    return (
        <div className="recommendation-form">
            <p className="add-recommendation-text">Add Recommendation</p>
            <form onSubmit={handleSubmit}>
                <ErrorList errors={errors}/>
                <label>
                    Track: 
                    <input 
                        type="text"
                        name="recommendedTrack"
                        id="recommendedTrack"
                        onChange={handleInputChange}
                        value={newRecommendation.recommendedTrack}
                    />
                </label>

                <label>
                    Artist:
                    <input 
                        type="text"
                        name="recommendedArtist"
                        id="recommendedArtist"
                        onChange={handleInputChange}
                        value={newRecommendation.recommendedArtist}
                    />
                </label>

                <label>
                    Other Comments:
                    <input
                        type="text"
                        name="textBody"
                        id="textBody"
                        onChange={handleInputChange}
                        value={newRecommendation.textBody}
                    />
                </label>

                <div>
                    <input className="button" type="submit" value="Submit" />
                </div>
                <button className="close-recommendation-button" onClick={handleCloseRecommendation}>Collapse Form</button>

            </form>
        </div>
    )
}

export default NewRecommendationForm