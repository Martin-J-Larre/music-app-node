const jwt = require("jwt-simple");
const moment = require("moment");

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, process.env.SECRET_KEY);
};

module.exports = {
  createToken,
};
