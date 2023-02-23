const express = require("express");
const router = express.Router();

const artistController = require("../controllers/artist");
const { isAuth } = require("../middlewares/auth");

router.post("/save", isAuth, artistController.saveArtist);
router.get("/profile/:id", isAuth, artistController.getOneArtist);
router.get("/profiles/:page?", isAuth, artistController.getAllArtists);

module.exports = router;
