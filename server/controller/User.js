const { User } = require("../models");
const { Todo } = require("../models");
const { Op } = require("sequelize");
const session = require("express-session");

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({
      where: { user_id: req.body.userId },
    });
    console.log(user.dataValues.id);

    if (user) {
      // 세션에 사용자 ID 저장
      req.session.userId = user.dataValues.id;

      //   console.log("session", req.session.userId); 제대로 작동
      const todos = await Todo.findAll({
        where: {
          user_id: user.id,
        },
      });

      //   console.log(req.session.userId);제대로 작동
      res.send({ todos: todos, userId: user.id });
    } else {
      res.send({ todos: todos, userId: user.id });
    }
  } catch (err) {
    res.send(err);
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
  const { userId, username, password, userEmail } = req.body;
  try {
    let createUser = await User.create({
      user_id: userId,
      user_name: username,
      user_pw: password,
      user_email: userEmail,
    });
    console.log("createUser", createUser);
  } catch (err) {
    res.send(err);
  }
};
