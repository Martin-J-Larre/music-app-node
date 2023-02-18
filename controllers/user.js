const UserModel = require("../models/User");
const validate = require("../helpers/validate");

exports.register = (req, res) => {
  const data = req.body;

  if (
    !data.name ||
    !data.surname ||
    !data.nickname ||
    !data.email ||
    !data.password
  ) {
    return res.status(400).json({
      status: "error",
      message: "Error some fields are empty",
    });
  }
  try {
    validate(data);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error validation in register",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "It is al ok",
    data,
  });
};
