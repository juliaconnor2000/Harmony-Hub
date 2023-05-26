import express from "express"
import { Track } from "../../../models/index.js"
import tracksRecommendationsRouter from "./tracksRecommendationsRouter.js"

const tracksRouter = new express.Router()

tracksRouter.get('/', async (req, res) => {
    try {
        const tracks = await Track.query()
        return res.status(200).json({ tracks })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

tracksRouter.get("/user", async (req, res) => {
    try {
        const tracks = await Track.query().where({ userId: req.user.id })
        return res.status(200).json({ tracks })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

tracksRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const track = await Track.query().findById(id)
        track.recommendations = await track.$relatedQuery("recommendations")
        return res.status(200).json({ track })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

tracksRouter.use("/:id/recommendations", tracksRecommendationsRouter)

// tracksRouter.get('/favorite', async (req, res) => {
//     try {
//         const track = await Track.query().findById(res.track.id).update({favorite: true})
//         return res.status(200).json({track})
//     } catch (err) {
//         return res.status(500).json({ errors: err })
//     }
// })

export default tracksRouter