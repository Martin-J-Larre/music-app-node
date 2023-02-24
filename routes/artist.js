const express = require("express");
const router = express.Router();
const multer = require("multer");

const artistController = require("../controllers/artist");
const { isAuth } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/artists/");
  },
  filename: (req, file, cb) => {
    cb(null, "artist-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

router.post("/save", isAuth, artistController.saveArtist);
router.get("/profile/:id", isAuth, artistController.getOneArtist);
router.get("/profiles/:page?", isAuth, artistController.getAllArtists);
router.put("/update/:id", isAuth, artistController.updateArtist);
router.delete("/delete/:id", isAuth, artistController.deleteArtist);
router.post(
  "/upload/:id",
  [isAuth, uploads.single("file")],
  artistController.uploadImage
);
router.get("/image/:file", artistController.getImage);

module.exports = router;
