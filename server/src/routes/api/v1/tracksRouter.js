import express from "express"
import { Track } from "../../../models/index.js"

const tracksRouter = new express.Router()

tracksRouter.get('/', async (req, res) => {
    try {
        const tracks = await Track.query().where({ userId: req.user.id })
        return res.status(200).json({ tracks })
    }
    catch (err) {
        return res.status(500).json({ errors: err })
    }
})

// stationRouter.get("/", async (req, res) => {
//     try {
//         const stations = await Station.query()
//         const serializedStations = await Promise.all(
//             stations.map(async (station) => {
//               return await StationSerializer.getSummary(station)
//             })
//           )
//         return res.status(200).json({ stations: serializedStations })
//     } catch (err) {
//         return res.status(500).json({ errors: err })
//     }
// })

export default tracksRouter