const { Todo } = require("../models");
const { Op } = require("sequelize");
const app = require("../app");

// GET /api/todos - show all todos (READ
exports.readTodos = async (req, res) => {
  // const userId = req.session.userId;
  // if (userId) {
  //   let todos = await Todo.findAll({
  //     where: {
  //       user_id: userId,
  //     },
  //   });
  //   console.log(todos);
  //   res.send(todos);
  // }
  console.log("readTodos !!!!!!!");
  try {
    console.log(req.query);
    let todos = await Todo.findAll();
    console.log(todos);
    res.send(todos);
  } catch (err) {
    res.send(err);
  }
};

// POST /api/todo - create a new todo (CREATE)
exports.createTodo = async (req, res) => {
  console.log(">>>>createTodo", req.body);
  try {
    let newTodo = await Todo.create({
      title: req.body.newItem.title,
      user_id: req.body.sessionId,
      done: false,
    });
    console.log(newTodo);
    res.send(newTodo);
    // res.end()
  } catch (err) {
    res.send(err);
  }
};

// PATCH /api/todo/:todoId - edit a specific todo (UPDATE)
exports.updateTodo = async (req, res) => {
  console.log(req.body);
  try {
    let [idUpdated] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: { [Op.eq]: req.params.todoId },
        },
      }
    );

    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let isDeleted = await Todo.destroy({
      where: {
        id: { [Op.eq]: req.params.todoId },
      },
      raw: true,
    });
    // 삭제 실패
    if (!isDeleted) {
      return res.send(false);
    }
    // 삭제 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};
