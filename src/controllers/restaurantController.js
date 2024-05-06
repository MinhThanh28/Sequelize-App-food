import e from "cors";
import { response } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getLikesByRestaurant = async (req, res) => {
  try {
    let { resId } = req.params;
    let likes = await model.like_res.findAll({
      where: {
        res_id: resId,
      },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });
    response(res, likes, "success", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "error", 500);
  }
};

const addLike = async (req, res) => {
  try {
    const { userId, resId } = req.body;
    const existingLike = await model.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (existingLike) {
      return response(res, "", "Like already exists", 409); // Conflict status
    }

    const newLike = await model.like_res.create({
      user_id: userId,
      res_id: resId,
    });

    response(res, newLike, "Like added successfully", 201);
  } catch (e) {
    console.error(e);
    response(res, "", "Error adding like", 500);
  }
};

const removeLike = async (req, res) => {
  try {
    const { userId, resId } = req.body;
    const existingLike = await model.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (!existingLike) {
      return response(res, "", "Like not found", 404); // Not Found status
    }

    await existingLike.destroy();
    response(res, "", "Like removed successfully", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "Error removing like", 500);
  }
};

const addRate = async (req, res) => {
  try {
    const { userId, resId, amount } = req.body;
    const existingRate = await model.rate_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (existingRate) {
      existingRate.amount = amount;
      existingRate.date_rate = new Date();
      await existingRate.save();
      return response(res, existingRate, "Rate updated successfully", 200);
    }

    const newRate = await model.rate_res.create({
      user_id: userId,
      res_id: resId,
      amount: amount,
      date_rate: new Date(),
    });

    response(res, newRate, "Rate added successfully", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "Error adding or updating rate", 500);
  }
};

const getRateByRestaurant = async (req, res) => {
  try {
    const { resId } = req.params;
    if (!resId) {
      return response(res, "", "Restaurant ID is required", 400);
    }

    const rate = await model.rate_res.findAll({
      where: { res_id: resId },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });

    response(res, rate, "Rate retrieved successfully", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "Error retrieving rate", 500);
  }
};

export {
  getLikesByRestaurant,
  addLike,
  removeLike,
  addRate,
  getRateByRestaurant,
};
