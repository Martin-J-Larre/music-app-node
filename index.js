const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./db/connection");

const app = express();
connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("It is all ok");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
