import express from "express";
import {
    addOrder,
  getLikesByUser,
  getRateByUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

// API get like with user_id
userRouter.get("/like-user/:userId", getLikesByUser);

// API get rate with user_id
userRouter.get("/rate-user/:userId", getRateByUser);

// API user order
userRouter.post("/user-order", addOrder);
export default userRouter;
