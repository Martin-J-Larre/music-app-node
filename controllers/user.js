const UserModel = require("../models/User");

exports.register = (req, res) => {
  const { name, surname, nickname, email, password } = req.body;

  if (!name || !surname || !nickname || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Error some fields are empty",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "It is al ok",
    name,
    surname,
    nickname,
  });
};
