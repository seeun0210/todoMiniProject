const express = require("express");
const router = express.Router();
const controller = require("../controller/User.js");
//로그인
// router.get("/login", controller.getLogin)
// router.get("/login", controller.getLogin);
router.post("/login", controller.login);

router.post("/signup", controller.signup);
module.exports = router;
