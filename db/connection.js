const mongoose = require("mongoose").set("strictQuery", true);

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.log(error);
    throw new Error("DATABASE NOT CONNECTED");
  }
};

module.exports = connection;
