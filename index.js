const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./db/connection");
const albumRoutes = require("./routes/album");
const artistRoutes = require("./routes/artist");
const songRoutes = require("./routes/song");
const userRoutes = require("./routes/user");

const app = express();
connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("It is all ok");
});

app.use("/api/album", albumRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/song", songRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
