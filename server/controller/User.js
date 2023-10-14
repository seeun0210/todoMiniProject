const { User } = require("../models");
const { Todo } = require("../models");
const { Op } = require("sequelize");

exports.login = async (req, res) => {
  console.log(">>>", req.body);
  try {
    let user = await User.findOne({
      where: { user_id: req.body.userId },
    });
    console.log("user>>", user);
    if (user) {
      const todos = await Todo.findAll({
        where: {
          user_id: user.todoUser.dataValues.id,
        },
      });
      console.log(todos);
      res.send("/todos", todos);
    } else {
      res.send("/signup");
    }
    res.send(todos);
  } catch (err) {
    res.send(err);
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
    console.log(createUser);
  } catch (err) {
    res.send(err);
  }
};
