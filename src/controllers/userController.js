import { response } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getLikesByUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let likes = await model.like_res.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: model.restaurant,
          as: "re",
          attributes: ["res_id", "res_name", "desciption"],
        },
      ],
    });
    response(res, likes, "success", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "error", 500);
  }
};

const getRateByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return response(res, "", "User ID is required", 400);
    }

    const rate = await model.rate_res.findAll({
      where: { user_id: userId },
      include: [
        {
          model: model.restaurant,
          as: "re",
          attributes: ["res_id", "res_name", "desciption"],
        },
      ],
    });

    response(res, rate, "Rate retrieved successfully", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "Error retrieving rate", 500);
  }
};

const addOrder = async (req, res) => {
  try {
    const { userId, foodId, amount, code, arrSubId } = req.body;
    const newOrder = {
      user_id: userId,
      food_id: foodId,
      amount: amount,
      code: code,
      arrSubId: arrSubId.join(',')
    };
    await model.order.create(newOrder);
    response(res, newOrder, "Order added successfully", 200);
  } catch (e) {
    console.error(e);
    response(res, "", "Error adding order", 500);
  }
};


export { getLikesByUser, getRateByUser, addOrder };
