const jwt = require("jwt-simple");
const moment = require("moment");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: "error",
      message: "Error user is not authorized",
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    const payload = jwt.decode(token, process.env.SECRET_KEY);

    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        status: "error",
        message: "Error expired token",
      });
    }

    req.user = payload;
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: "Error invalid token",
    });
  }

  next();
};

module.exports = {
  isAuth,
};
