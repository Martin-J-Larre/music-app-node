const UserModel = require("../models/User");
const validate = require("../helpers/validate");
const bcrypt = require("bcrypt");
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

  UserModel.find({
    $or: [
      { email: data.email.toLowerCase() },
      { nickname: data.nickname.toLowerCase() },
    ],
  }).exec(async (error, users) => {
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Error user duplicated",
      });
    }
    if (users && users.length >= 1) {
      return res.status(200).json({
        status: "error",
        message: "Error already exist",
      });
    }

    let passwordHashed = await bcrypt.hash(data.password, 10);
    data.password = passwordHashed;

    const newUser = new UserModel(data);

    newUser.save((error, userSaved) => {
      if (error || !userSaved) {
        return res.status(500).json({
          status: "error",
          message: "Error user could not be saved",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "User saved successfully",
        userSaved,
      });
    });
  });
};
