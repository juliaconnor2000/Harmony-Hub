import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import authSpotifyRouter from "./authSpotifyRouter.js";
import tracksRouter from "./api/v1/tracksRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/auth/spotify", authSpotifyRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/tracks", tracksRouter)
rootRouter.use("/", clientRouter);
// rootRouter.use("/auth/spotify", authSpotifyRouter)

//place your server-side routes here

export default rootRouter;
