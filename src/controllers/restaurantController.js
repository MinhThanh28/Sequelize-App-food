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

export { getLikesByRestaurant };
