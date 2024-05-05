import express from "express";
import { getLikesByRestaurant } from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

// API get like with res_id

restaurantRouter.get("/like-restaurant/:resId", getLikesByRestaurant);

export default restaurantRouter;