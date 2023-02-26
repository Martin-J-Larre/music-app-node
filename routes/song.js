const express = require("express");
const router = express.Router();

const songController = require("../controllers/song");
const { isAuth } = require("../middlewares/auth");

router.post("/create", isAuth, songController.createSong);
router.get("/name/:id", isAuth, songController.getOneSong);
router.get("/names/:albumId", isAuth, songController.getAllSongs);
router.put("/update/:id", isAuth, songController.updateSong);

module.exports = router;
