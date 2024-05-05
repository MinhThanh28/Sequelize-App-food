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

export { getLikesByUser };
