const express = require("express");
const router = express.Router();

const albumController = require("../controllers/album");
const { isAuth } = require("../middlewares/auth");

router.post("/create", isAuth, albumController.createAlbum);
router.get("/name/:id", isAuth, albumController.getOneAlbum);
router.get("/names/:artistId", isAuth, albumController.getAllAlbums);
router.put("/update/:id", isAuth, albumController.updateAlbum);

module.exports = router;
