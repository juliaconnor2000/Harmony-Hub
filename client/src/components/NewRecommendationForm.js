import React, { useState, useEffect } from "react"

const NewRecommendationForm = ({postNewRecommendation}) => {
    const [showForm, setShowForm] = useState(false);

    const [newRecommendation, setNewRecommendation] = useState ({
        recommendedTrack: "",
        recommendedArtist: "",
        textBody: "",
    })

    // const [errors, setErrors] = useState({})
    // const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleInputChange = (event) => {
        // event.preventDefault()
        // console.log(event.currentTarget.value)
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
        clearForm()
    }

    const handleAddRecommendation = () => {
        setShowForm(true);
      };

      const handleCloseRecommendation = () => {
        setShowForm(false)
      }
    
      if (!showForm) {
        return (
          <div>
            <button onClick={handleAddRecommendation}>Add Recommendation</button>
          </div>
        );
      }

    // if (shouldRedirect) {
    //     return <Redirect push to="/" />
    // }

    return (
        <div className="recommendation-form">
            <p>Add Recommendation</p>
            <form onSubmit={handleSubmit}>
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
                <button onClick={handleCloseRecommendation}>Close Form</button>

            </form>
        </div>
    )
}

export default NewRecommendationForm