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

tracksRouter.get('/:id/favorite', async (req, res) => {
    const { id } = req.params;
    try {
      const track = await Track.query().findById(id);
      if (!track) {
        return res.status(404).json({ error: 'Track not found' });
      }
      track.favorite = true;
      await track.$query().patch();
      return res.status(200).json({ track });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  tracksRouter.get('/:id/unfavorite', async (req, res) => {
    const { id } = req.params;
    try {
      const track = await Track.query().findById(id);
      if (!track) {
        return res.status(404).json({ error: 'Track not found' });
      }
      track.favorite = false;
      await track.$query().patch();
      return res.status(200).json({ track });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

tracksRouter.use("/:id/recommendations", tracksRecommendationsRouter)

export default tracksRouter