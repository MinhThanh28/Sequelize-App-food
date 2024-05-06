import express from "express";
import {
  addLike,
  addRate,
  getLikesByRestaurant,
  getRateByRestaurant,
  removeLike,
} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

// API get like with res_id

restaurantRouter.get("/like-restaurant/:resId", getLikesByRestaurant);

// API add like
restaurantRouter.post("/like-restaurant", addLike);

// API remove like
restaurantRouter.delete("/like-restaurant", removeLike);

// Api rate restaurant
restaurantRouter.post("/rate-restaurant", addRate);

// API get rate with res_id
restaurantRouter.get("/rate-restaurant/:resId", getRateByRestaurant);
export default restaurantRouter;
