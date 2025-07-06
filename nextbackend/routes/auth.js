const express = require("express");
const router = express.Router();
const { adminLogin, register, login, changePassword } = require("../controllers/authController");

router.post("/admin/login", adminLogin);
router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);

module.exports = router;