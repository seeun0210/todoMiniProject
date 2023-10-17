const express = require("express");
const session = require("express-session");
const router = express.Router();
const controller = require("../controller/User.js");
//로그인
// router.get("/login", controller.getLogin)
// router.get("/login", controller.getLogin);
router.post("/login", controller.login);
router.post("/idCheck", controller.idCheck);
router.get("/get-session-id", controller.getSessionId); //세션 설정
router.post("/signup", controller.signup);
module.exports = router;
