const bcrypt = require("bcrypt");

const validate = require("../helpers/validate");
const UserModel = require("../models/User");
const jwt = require("../helpers/jwt");

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

      const userCreated = userSaved.toObject();
      delete userCreated.password;
      delete userCreated.role;

      return res.status(200).json({
        status: "success",
        message: "User saved successfully",
        userCreated,
      });
    });
  });
};

exports.login = (req, res) => {
  const data = req.body;

  if (!data.password || !data.email) {
    return res.status(400).json({
      status: "error",
      message: "Error fields password or email empty",
    });
  }

  UserModel.findOne({ email: data.email })
    .select("+password +role")
    .exec((error, user) => {
      if (error || !user) {
        return res.status(404).json({
          status: "error",
          message: "Error user could not be found",
        });
      }

      const password = bcrypt.compareSync(data.password, user.password);

      if (!password) {
        return res.status(400).json({
          status: "error",
          message: "Error incorrect password",
        });
      }

      const dataUser = user.toObject();
      delete dataUser.password;

      const token = jwt.createToken(user);

      return res.status(200).json({
        status: "success",
        message: "It is all OK Login",
        user: dataUser,
        token,
      });
    });
};

exports.getUserProfile = (req, res) => {
  const userId = req.params.id;

  UserModel.findById(userId, (error, userProfile) => {
    if (error || !userProfile) {
      return res.status(400).json({
        status: "error",
        message: "Error user profile could not be found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "All ok method get user profile",
      userProfile,
    });
  });
};
