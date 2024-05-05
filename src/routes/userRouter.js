import express from "express";
import { getLikesByUser } from "../controllers/userController.js";


const userRouter = express.Router();

// API get like with user_id

userRouter.get("/like-user/:userId", getLikesByUser);

export default userRouter;