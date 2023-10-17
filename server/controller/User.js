const { User } = require("../models");
const { Todo } = require("../models");
const { Op } = require("sequelize");
const session = require("express-session");

exports.login = async (req, res) => {
  try {
    console.log(req.body.data);
    const { id, pw } = req.body.data;
    let user = await User.findOne({
      where: {
        [Op.and]: [{ user_id: id }, { user_pw: pw }],
      },
    });
    console.log(user);

    if (user) {
      // 세션에 사용자 ID 저장
      req.session.userId = user.dataValues.id;
      res.send({ result: true });
      console.log("session", req.session.userId);

      //   console.log(req.session.userId);제대로 작동
    } else {
      res.send({ result: false });
    }
  } catch (err) {
    res.send(err);
  }
};
exports.idCheck = async (req, res) => {
  try {
    const id = req.body.data.id;

    if (!id) {
      // 클라이언트로부터 유효한 id 값이 전달되지 않은 경우
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const result = await User.findOne({
      where: { user_id: id },
    });

    if (!result) {
      res.send(true); // 아이디가 존재하지 않는 경우
    } else {
      res.send(false); // 아이디가 이미 존재하는 경우
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSessionId = async (req, res) => {
  const sessionId = req.session.userId;
  if (sessionId) {
    res.send({ sessionId: sessionId });
  } else {
    res.status(404).send({ error: "Session ID not found" });
  }
};

exports.signup = async (req, res) => {
  console.log(">>>", req.body);
  const { id, name, pw, email } = req.body;
  try {
    let createUser = await User.create({
      user_id: id,
      user_name: name,
      user_pw: pw,
      user_email: email,
    });
    console.log("createUser", createUser);
    res.status(201).json(createUser); // HTTP 201 Created 응답 반환
  } catch (err) {
    res.status(500).json(err); // HTTP 500 Internal Server Error 응답 반환
  }
};
