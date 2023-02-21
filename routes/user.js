const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", isAuth, userController.getUserProfile);
router.put("/update", isAuth, userController.updateUser);

module.exports = router;
