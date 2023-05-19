import express from "express"
import { User } from "../../../models/index.js"

const userInfoRouter = new express.Router()

userInfoRouter.get("/:id", async (req, res) => {
    // console.log(req.params)
    const { id } = req.params
    try {
        const user = await User.query().findById(id)
        return res.status(200).json({ user })
    }
    catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default userInfoRouter