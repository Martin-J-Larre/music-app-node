const validator = require("validator");

const validate = (data) => {
  const name =
    !validator.isEmpty(data.name) &&
    validator.isLength(data.name, { min: 3, max: undefined }) &&
    validator.isAlpha(data.name);
  const surname =
    !validator.isEmpty(data.surname) &&
    validator.isLength(data.surname, { min: 3, max: undefined }) &&
    validator.isAlpha(data.surname);
  const nickname =
    !validator.isEmpty(data.nickname) &&
    validator.isLength(data.nickname, { min: 2, max: 60 });
  const email = !validator.isEmpty(data.email) && validator.isEmail(data.email);
  const password =
    !validator.isEmpty(data.password) &&
    validator.isLength(data.password, { min: 4, max: undefined });

  if (!name || !surname || !nickname || !email || !password) {
    throw new Error("Validation error");
  }
};

module.exports = validate;
