const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connection = require("./db/connection");
const albumRoutes = require("./routes/album");
const artistRoutes = require("./routes/artist");
const songRoutes = require("./routes/song");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5001;
connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, ".", "views", "index.html"));
});

app.use("/api/album", albumRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/song", songRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
