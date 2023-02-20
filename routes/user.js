const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getUserProfile);

module.exports = router;
