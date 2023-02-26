const express = require("express");
const router = express.Router();
const multer = require("multer");

const albumController = require("../controllers/album");
const { isAuth } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/albums/");
  },
  filename: (req, file, cb) => {
    cb(null, "album-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

router.post("/create", isAuth, albumController.createAlbum);
router.get("/name/:id", isAuth, albumController.getOneAlbum);
router.get("/names/:artistId", isAuth, albumController.getAllAlbums);
router.put("/update/:id", isAuth, albumController.updateAlbum);
router.post(
  "/upload/:id",
  [isAuth, uploads.single("file")],
  albumController.uploadImage
);
router.get("/image/:file", isAuth, albumController.getImage);

module.exports = router;
