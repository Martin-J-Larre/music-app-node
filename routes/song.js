const express = require("express");
const router = express.Router();
const multer = require("multer");

const songController = require("../controllers/song");
const { isAuth } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/songs/");
  },
  filename: (req, file, cb) => {
    cb(null, "song-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

router.post("/create", isAuth, songController.createSong);
router.get("/name/:id", isAuth, songController.getOneSong);
router.get("/names/:albumId", isAuth, songController.getAllSongs);
router.put("/update/:id", isAuth, songController.updateSong);
router.delete("/delete/:id", isAuth, songController.deleteSong);
router.post(
  "/upload/:id",
  [isAuth, uploads.single("file")],
  songController.uploadFile
);
router.get("/audio/:file", isAuth, songController.getFile);

module.exports = router;
