import express from "express"
import { Track, Recommendation } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
const { ValidationError } = objection

const tracksRecommendationsRouter = new express.Router({ mergeParams: true })

tracksRecommendationsRouter.post("/", async (req, res) => {
    // console.log(req)
    // console.log(req.params.id)
    const formInput = cleanUserInput(req.body)
    const { recommendedTrack, recommendedArtist, textBody } = formInput
    const trackId = req.params.id
    // console.log(trackId)
    const track = await Track.query().findById(trackId)
    console.log(track)
    const recommendeeId = track.userId
    const recommenderId = req.user.id
    try {
        const newRecommendation = await Recommendation.query().insertAndFetch({
            recommenderId, recommendeeId, trackId, recommendedTrack, recommendedArtist, textBody
        })
        return res.status(201).json({ recommendation: newRecommendation })
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(422).json({ errors: err.data })
        }
        return res.status(500).json({ errors: err })
    }
})



export default tracksRecommendationsRouter