const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/upload",
  [isAuth, uploads.single("file")],
  userController.uploadAvatar
);
router.get("/profile/:id", isAuth, userController.getUserProfile);
router.put("/update", isAuth, userController.updateUser);

module.exports = router;
