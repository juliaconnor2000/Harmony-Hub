import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList.js"

const NewRecommendationForm = ({postNewRecommendation}) => {
    const [newRecommendation, setNewRecommendation] = useState ({
        recommendedTrack: "",
        recommendedArtist: "",
        textBody: "",
    })

    // const [errors, setErrors] = useState({})
    // const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleInputChange = (event) => {
        event.preventDefault()
        setNewRecommendation({
            ...newRecommendation,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const clearForm = () => {
        setNewRecommendation({
            body: "",
            rating: "",
            hasPolicePresence: null,
            hasSittingWater: null,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postNewRecommendation(newRecommendation)
        clearForm()
    }

    // if (shouldRedirect) {
    //     return <Redirect push to="/" />
    // }

    return (
        <div>
            <h1> Add Recommendation </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Track: 
                    <input 
                        type="text"
                        name="track"
                        id="track"
                        onChange={handleInputChange}
                        value={newRecommendation.recommendedTrack}
                    />
                </label>

                <label>
                    Artist:
                    <input 
                        type="text"
                        name="artist"
                        id="artist"
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
            </form>
        </div>
    )
}

export default NewRecommendationForm