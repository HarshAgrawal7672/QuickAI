import express from "express"
import { auth } from "../middlewares/auth.js"
import { getPublishedCreations, getUserCreation, toggleLikeCreations } from "../controllers/usercontroller.js"

const userRouter=express.Router()

userRouter.get("/get-user-creations",auth,getUserCreation)
userRouter.get("/get-published-creations",auth,getPublishedCreations)
userRouter.post("/toggle-like-creation",auth,toggleLikeCreations)


export default userRouter;


