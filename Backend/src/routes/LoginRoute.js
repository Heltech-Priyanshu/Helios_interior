const express=require("express");
const router = express.Router();
const { register, login } = require("../controllers/LoginController");
const Authentication = require("../middleware/AuthMiddleware");

router.post("/register", register);
router.post("/login", login);

module.exports = router;